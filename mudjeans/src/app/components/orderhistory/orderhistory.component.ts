import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../services/order.service';
import {MatTableDataSource} from "@angular/material/table";
import {Order} from '../../models/Order';
import {Jean} from "../../models/Jean";
import {OrderJean} from "../../models/OrderJean";

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  // @ts-ignore
    currentOrder: Order = null;
    orderedJeans: OrderJean[] = [];

  displayedColumns = ['Order number', 'Date of Order', 'Placed By', 'Reviewed By', 'Note', 'Status'];
  dataSource;
  count: number;
  readOnly = true;

  constructor(private toastr: ToastrService, private orderService: OrderService) {
    const array = [];
    this.orderService.restGetOrder().subscribe((data) => {
         console.log(data);
          // tslint:disable-next-line:prefer-for-of
         for (let i = 0; i < data.length; i++) {
            // tslint:disable-next-line:max-line-length
            const order: Order = new Order(data[i].orderId, data[i].note, data[i].date, data[i].creator.name, data[i].status, data[i].reviewer.name);
            array.push(order);
          }
         this.dataSource = new MatTableDataSource<Order>(array);
        },
        (error) => {
          alert('Error:' + error);
        });
  }

  ngOnInit(): void {
  }

    onOrderSelected (order: Order) {
        this.currentOrder = order;
        this.count = 0;
        this.getOrderedJeans(this.count);
    }

    // tslint:disable-next-line:typedef
  hasSelection() {
      return !!this.currentOrder;
    }

    changePage(change: string): void {
        switch (change) {
            case "minus": this.count--;
                          break;
            case "plus": this.count++;
                         break;
            default: break;
        }
        this.getOrderedJeans(this.count);
    }

    public getOrderedJeans (page: number) {
        this.orderedJeans = [];
        this.orderService.getByOrderId(this.currentOrder.idOrder, page).subscribe(
            (data) => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    const j: Jean = Jean.trueCopy(data[i].jeans);
                    const o: Order = Order.trueCopy(data[i].order);
                    this.orderedJeans.push(new OrderJean(o, j, data[i].quantity));
                }
            },
            (err) => {
                alert('Error:' + err);
            }
        );
    }
}
