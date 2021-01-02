import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  public restGetPendingOrders(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/orders/pending');
  }

  public getByOrderId(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8085/orders/orderjeans/${id}`);
  }
}
