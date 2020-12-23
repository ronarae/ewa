import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SessionSbService} from "./session-sb.service";

@Injectable()
export class AuthSbInterceptor implements HttpInterceptor {

    constructor(private session: SessionSbService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.session.getToken() == null) {
            return next.handle(req);
        } else {
            // If there is a token -> add token
            if (this.session.getToken()) {
                req = this.addToken(req, this.session.getToken());
            }
            // Go on and try to refresh the token
            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => {
                    // If error = 401: unauthorized
                    if (error && error.status === 401) {
                        // Failed to refresh
                        if (req.url.endsWith('authenticate')) {
                            this.forceLogOff();
                            return throwError(error);
                        } else {
                            return this.session.refreshToken().pipe(
                                switchMap((data) => {
                                    // Get refreshed token
                                    const token = data['headers'].get('Authorization');
                                    // Try again with the new token
                                    return next.handle(this.addToken(req, data['headers'].get('Authorization')));
                                })
                            );
                        }
                    } else {
                        return throwError(error);
                    }
                })
            );
        }
    }

    private forceLogOff(): any {
        this.session.logOff();
        this.router.navigate(['/login'], {queryParams: {msg: 'Session expired'}});
    }

    // Adds the token header to the request.
    private addToken(request: HttpRequest<any>, token: string): any {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}
