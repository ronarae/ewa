import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Jean} from "../../../models/Jean";
import {SalesSbService} from "../../../services/sales-sb.service";
import {Order} from "../../../models/Order";
import {MatTableDataSource} from "@angular/material/table";
import {OrderJean} from "../../../models/OrderJean";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pendingOrders = [];
  lowStockJeans = [];
  bestseller = null;
  totalJeansSold = 0;

  allJeans = [];

  constructor(private orderService: OrderService, private jeansService: SalesSbService) {
    this.orderService.restGetPendingOrders().subscribe((data) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.length; i++) {
            // tslint:disable-next-line:max-line-length
              const order: Order = new Order(data[i].orderId, data[i].note, data[i].date, data[i].creator.name, data[i].status, data[i].reviewer.name);
              this.pendingOrders.push(order);
          }
        },
        (error) => {
          alert('Error:' + error);
        });

    this.jeansService.restGetJean().subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
              const jean: Jean = Jean.trueCopy(data[i]);
              this.allJeans.push(jean);
              if (data[i].shouldOrder === true) {
                this.lowStockJeans.push(jean);
            }
          }
        },
        (error) => {
          alert('Error:' + error);
        });
  }

  ngOnInit(): void {
  }

}
