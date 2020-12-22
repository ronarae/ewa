import { Injectable } from '@angular/core';
import {User} from "../models/User";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {share, shareReplay} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SessionSbService {
  public readonly BACKEND_AUTH_URL = 'http://localhost:8085/auth';

  currentUser: User = null;
  jwtService = new JwtHelperService();

  constructor(private http: HttpClient) {
      this.updateUserInformation();
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  saveToken(token: string, username: string): any {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  logIn(email: string, password: string): Observable<any> {
    const signInRespons = this.http.post<HttpResponse<User>>(
        this.BACKEND_AUTH_URL + '/login',
        {eMail: email, passWord: password},
        {observe: 'response'}).pipe(shareReplay(1));
    signInRespons.subscribe(
        response => {
          console.log(response);
          this.saveToken(
              response.headers.get('Authorization'),
              (response.body as unknown as User).name
          );
          this.updateUserInformation();
        },
        error => {
          console.log(error);
          this.saveToken(null, null);
        }
    );
    return signInRespons;
  }

  LogOff(): any {
    sessionStorage.removeItem('token');
    this.updateUserInformation();
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  get email(): string {
    return this.currentUser.email;
  }

  refreshToken(): Observable<any> {
    const observable = this.http.post(`${environment.apiUrl}/refresh-token`, {},
        { headers: new HttpHeaders({Authorization: this.getToken()}), observe: 'response'}).pipe(share());

    observable.subscribe(data => {
          let refreshedToken = data['headers'].get('Authorization');

          if (refreshedToken == null) {
            throw new Error('token was not present in the response');
          }

          refreshedToken = refreshedToken.replace('Bearer ', '');

          sessionStorage.setItem('token', refreshedToken);

          this.updateUserInformation();
        },
        (err) => {
          this.LogOff();
        });
    return observable;
  }

  private updateUserInformation(): void {
    if (this.getToken() !== null) {
      const decodedToken = this.jwtService.decodeToken(this.getToken());

      this.currentUser = new User();
      this.currentUser.email = decodedToken.sub;
      this.currentUser.role = decodedToken.role;
      this.currentUser.exp = decodedToken.exp;
    } else {
      this.currentUser = null;
    }
  }
}
