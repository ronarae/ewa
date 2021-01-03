import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/Order";
import {OrderJean} from "../models/OrderJean";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  public restGetPendingOrders(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8085/orders/pending');
  }

  public getByOrderId(id: number, page: number): Observable<any> {
    return this.httpClient.get<OrderJean>(`http://localhost:8085/orders/orderjeans/${id}/${page}`);
  }

  public updateOrder(order: Order): Observable<Order> {
    console.log("Sending request");
    return this.httpClient.put<Order>('http://localhost:8085/orders', order);
  }

  public addOrder(order: Order): Observable<Order> {
    console.log("Adding order");
    return this.httpClient.post<Order>('http://localhost:8085/orders', order);
  }

  public restGetOrder(): Observable<Order[]> {
    return this.httpClient.get<Order[]>('http://localhost:8085/orders/notpending');
  }

  public exportToCsv(id: number): any {
    // @ts-ignore
    return this.httpClient.get<any>(`http://localhost:8085/orders/export/${id}`, {responseType: 'text'});
  }
}
