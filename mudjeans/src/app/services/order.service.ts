import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/Order";
import {OrderJean} from "../models/OrderJean";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public readonly BACKEND_URL = environment.apiUrl + "/orders";

  constructor(private httpClient: HttpClient) { }

  public restGetPendingOrders(): Observable<any> {
    return this.httpClient.get<any>(this.BACKEND_URL + '/pending');
  }

  public getByOrderId(id: number, page: number): Observable<any> {
    return this.httpClient.get<OrderJean>(`${this.BACKEND_URL}/orderjeans/${id}/${page}`);
  }

  public updateOrder(order: Order): Observable<Order> {
    console.log("Sending request");
    return this.httpClient.put<Order>(this.BACKEND_URL, order);
  }

  public addOrder(order: Order): Observable<Order> {
    console.log("Adding order");
    return this.httpClient.post<Order>(this.BACKEND_URL, order);
  }

  public restGetOrder(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.BACKEND_URL + '/notpending');
  }

  public exportToCsv(id: number): any {
    // @ts-ignore
    return this.httpClient.get<any>(`${this.BACKEND_URL}/export/${id}`, {responseType: 'text'});
  }
}
