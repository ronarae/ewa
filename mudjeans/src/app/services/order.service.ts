import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/Order";
import {OrderJean} from "../models/OrderJean";
import {environment} from "../../environments/environment";
import {Jean} from "../models/Jean";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[];

  public readonly BACKEND_URL = environment.apiUrl + "/orders";

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
    this.orders = [];
    this.restGetPendingOrders().subscribe(
        (data) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.length; i++) {
            this.orders.push(Order.trueCopy(data[i]));
          }
        },
        (error) => {
          this.toastr.error(error.error);
        }
    )
  }

  public findAll(): Order[] {
    return this.orders;
  }

  save(order: Order): void {
    const id = this.orders.findIndex((x) => x.idOrder === order.idOrder);
    // jean not found
    if (id === -1) {
      this.orders.push(order);
      this.addOrder(order).subscribe((data) => console.log(data));
    } else {
      this.orders[id] = order;
      this.updateOrder(order).subscribe((data) => console.log(data));
    }
  }

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
