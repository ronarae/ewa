import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../services/order.service';
import {MatTableDataSource} from "@angular/material/table";
import {Order} from '../../models/Order';
import {Jean} from "../../models/Jean";
import {OrderJean} from "../../models/OrderJean";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-orderhistory',
    templateUrl: './orderhistory.component.html',
    styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit, AfterViewInit {

    // @ts-ignore
    currentOrder: Order = new Order();
    orderedJeans: OrderJean[] = [];

    displayedColumns = ['Order number', 'Date of Order', 'Placed By', 'Reviewed By', 'Note', 'Status'];
    dataSource;
    count: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private toastr: ToastrService, private orderService: OrderService) {
        const array = [];
        this.orderService.restGetOrder().subscribe((data) => {
                console.log(data);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < data.length; i++) {
                    // tslint:disable-next-line:max-line-length
                    // @ts-ignore
                    // tslint:disable-next-line:max-line-length
                    const order: Order = new Order(data[i].orderId, data[i].note, data[i].date, data[i].creator.name, data[i].status, data[i].reviewer.name);
                    array.push(order);
                }
                this.dataSource = new MatTableDataSource<Order>(array);
                setTimeout(() => this.dataSource.paginator = this.paginator);
            },
            (error) => {
                this.toastr.error(error.error);
            });
    }

    ngOnInit(): void {
    }

    // tslint:disable-next-line:typedef use-lifecycle-interface
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    onOrderSelected(order: Order): void {
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
            case "minus":
                this.count--;
                break;
            case "plus":
                this.count++;
                break;
            default:
                break;
        }

        this.getOrderedJeans(this.count);
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
                this.toastr.error(err.error);
            }
        );
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    public export() {
        this.orderService.exportToCsv(this.currentOrder.idOrder)
            .subscribe((data) =>  {
                // console.log(data);
                const blob = new Blob([data], { type: 'text/csv' });
                const url= window.URL.createObjectURL(blob);
                window.open(url);
            });
    }
}
