import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from "../../../services/order.service";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../../../models/Order";
import {MatPaginator} from "@angular/material/paginator";
import {OrderJean} from "../../../models/OrderJean";
import {Jean} from "../../../models/Jean";

@Component({
    selector: 'app-customize-order',
    templateUrl: './customize-order.component.html',
    styleUrls: ['./customize-order.component.css']
})
export class CustomizeOrderComponent implements OnInit, AfterViewInit {

    // @ts-ignore
    currentOrder: Order = null;
    orderedJeans: OrderJean[] = [];
    count: number;

    readOnly = true;

    displayedColumns = ['Order Id', 'Order Date', 'Order Message', 'Placed By'];
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private toastr: ToastrService, private orderService: OrderService) {
        const array = [];
        this.orderService.restGetPendingOrders().subscribe((data) => {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    // tslint:disable-next-line:max-line-length
                    const order: Order = new Order(data[i].orderId, data[i].note, data[i].date, data[i].creator.name, data[i].status, data[i].reviewer.name);
                    array.push(order);
                }
                this.dataSource = new MatTableDataSource<Order>(array);
                setTimeout(() => this.dataSource.paginator = this.paginator);
            },
            (error) => {
                alert('Error:' + error);
            });
    }

    ngOnInit(): void {
    }

    // tslint:disable-next-line:typedef use-lifecycle-interface
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // tslint:disable-next-line:typedef
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    // tslint:disable-next-line:typedef
    onOrderSelected(order: Order) {
        this.currentOrder = order;
        this.count = 0;
        this.getOrderedJeans(this.count);
    }

    // tslint:disable-next-line:typedef
    hasSelection() {
        return !this.currentOrder;
    }

    changeReadonly(read: boolean): void {
        this.readOnly = read;
    }


    // tslint:disable-next-line:typedef
    public getOrderedJeans(page: number) {
        this.orderedJeans = [];
        this.orderService.getByOrderId(this.currentOrder.idOrder, page).subscribe(
            (data) => {
                for (const item of data) {
                    const j: Jean = Jean.trueCopy(item.jeans);
                    this.orderedJeans.push(new OrderJean(j, item.quantity));
                }
            },
            (err) => {
                alert('Error:' + err);
            }
        );
    }


    changePage(change: string): void {
        switch (change) {
            case "minus":
                this.count--;
                break;
            case "plus":
                this.count++;
                break;
            default:
                break;
        }
        this.save();
        this.getOrderedJeans(this.count);
    }

    // tslint:disable-next-line:typedef
    save() {
        this.currentOrder.jeansArray = [];

        if (this.orderedJeans.length < 1) {
            return;
        }

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.orderedJeans.length; i++) {
            this.currentOrder.addToOrder(this.orderedJeans[i]);
        }
        console.log(this.currentOrder);

        this.orderService.updateOrder(this.currentOrder).subscribe((data) => console.log(data));
    }
}
