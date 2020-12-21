import { Injectable } from '@angular/core';
import {Jean} from '../models/Jean';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  public jeans: Jean[];


  constructor(private httpClient: HttpClient) {
    this.jeans = [];
    this.restGetJean().subscribe(
        (data) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.length; i++) {
            this.jeans.push(Jean.trueCopy(data[i]));
          }
        },
        (error) => {
          alert('Error:' + error);
        }
    );
  }

  private restGetJean(): Observable<Jean[]> {
    return this.httpClient.get<Jean[]>(environment.apiUrl + 'jeans');
  }

  private restPostJean(jean: Jean): Observable<Jean> {
    // @ts-ignore
    return this.httpClient.post<Jean>(environment.apiUrl + jean);
  }

  private restPutJean(jean: Jean): Observable<Jean> {
    const url = `https://ewa-be-app-staging.herokuapp.com/jeans/${jean.productCode}`;
    return this.httpClient.put<Jean>(url, jean);
  }

  private restDeleteJean(productcode: string): void {
    const url = `https://ewa-be-app-staging.herokuapp.com/jeans/${productcode}`;
    this.httpClient.delete(url);
  }

  findAll(): Jean[] {
    return this.jeans;
  }

  findByProductcode(productcode: string): Jean {
    return this.jeans.find((jeans) => jeans.productCode === (productcode));
  }

  save(jean: Jean): Jean{
    const returnJean = this.findByProductcode(jean.productCode);
    this.jeans[this.jeans.findIndex((x) => x.productCode === jean.productCode)] = jean;
    return returnJean;
  }

  deleteByProductcode(id: string): Jean{
    const index = this.jeans.findIndex((jean) => jean.productCode === id);
    if (index === -1) {
      return null;
    }
    return this.jeans.splice(index, 1)[0];
  }
}
