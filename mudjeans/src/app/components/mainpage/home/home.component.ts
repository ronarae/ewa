import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Jean} from "../../../models/Jean";
import {SalesSbService} from "../../../services/sales-sb.service";
import {Order} from "../../../models/Order";
import {MatTableDataSource} from "@angular/material/table";
import {OrderJean} from "../../../models/OrderJean";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    pendingOrders: Order[] = [];
    lowStockJeans: Jean[] = [];
    highstStockJean: Jean = null;
    highestStock = 0;
    totalStock = 0;

    allJeansPerStyle: string[] = [];
    allJeansPerStyleInStock: number[] = [];
    cssColor: string[] = ["bg-danger", "bg-warning", "", "bg-info", "bg-success"];
    highestJeansStockPerStyle = 0;

    constructor(private orderService: OrderService, private jeansService: SalesSbService, private toastr: ToastrService) {
        this.orderService.restGetPendingOrders().subscribe((data) => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    // tslint:disable-next-line:max-line-length
                    const order: Order = new Order(data[i].orderId, data[i].note, data[i].date, data[i].creator.name, data[i].status, data[i].reviewer.name);
                    this.pendingOrders.push(order);
                }
            },
            (error) => {
                this.toastr.error(error.error);
            });

        this.jeansService.restGetJean().subscribe((data) => {
                let currentStyle = "";
                for (let i = 0; i < data.length; i++) {
                    if (currentStyle === data[i].styleName) { // if same style name --> add the stock amount
                        this.allJeansPerStyleInStock[this.allJeansPerStyleInStock.length - 1] += data[i].latestStock;
                    } else { // if there is a new style --> push new style in array
                        if (this.allJeansPerStyleInStock[this.allJeansPerStyleInStock.length - 1] > this.highestJeansStockPerStyle) {
                            this.highestJeansStockPerStyle = this.allJeansPerStyleInStock[this.allJeansPerStyleInStock.length - 1];
                        }
                        currentStyle = data[i].styleName;
                        this.allJeansPerStyle.push(currentStyle);
                        this.allJeansPerStyleInStock.push(data[i].latestStock);
                    }
                    if (this.highestStock <= data[i].latestStock) { // update highest stock
                        this.highestStock = data[i].latestStock;
                        this.highstStockJean = Jean.trueCopy(data[i]);
                    }
                    this.totalStock += data[i].latestStock;
                    if (data[i].latestStock === 0) { // if should order add to should order list
                        const jean: Jean = Jean.trueCopy(data[i]);
                        this.lowStockJeans.push(jean);
                    }
                }
                // console.log(this.highestJeansStockPerStyle);
            },
            (error) => {
                this.toastr.error(error.error);
            });
    }

    ngOnInit(): void {
    }

    setWidth(stock: number): number {
        return stock * 100;
    }

}
