import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // Pointing to the back-end endpoint
  url = 'http://localhost:8085/upload';

  constructor(private http: HttpClient) { }

  uploadWithProgress(object: any): Observable<any> {
    console.log('object: ' + object);
    console.log('info ' + this.http.post(this.url, object, {reportProgress: true, observe: 'events'}));
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
