import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SessionSbService} from "./session-sb.service";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // Pointing to the back-end endpoint
  url = 'http://localhost:8085/upload';

  constructor(private http: HttpClient) { }

  uploadWithProgress(object: any): Observable<any> {
    return this.http.post(this.url, object, {reportProgress: true, observe: 'events'})
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
