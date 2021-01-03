import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SessionSbService} from "./session-sb.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // Pointing to the back-end endpoint
  public readonly BACKEND_AUTH_URL = environment.apiUrl + "/upload";

  constructor(private http: HttpClient) { }

  uploadWithProgress(object: any): Observable<any> {
    return this.http.post(this.BACKEND_AUTH_URL, object, {reportProgress: true, observe: 'events'})
        .pipe(
            catchError(err => this.handleError(err))
        );
  }

  // tslint:disable-next-line:typedef
  private handleError(error: any) {
    console.log('handleError');
    return throwError(error);
  }
}
