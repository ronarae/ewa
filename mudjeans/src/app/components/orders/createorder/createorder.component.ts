import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormControl} from '@angular/forms';
import {SalesSbService} from "../../../services/sales-sb.service";
import {Jean} from "../../../models/Jean";
import {MatDialog} from "@angular/material/dialog";
// @ts-ignore
import {Order} from "../../../models/Order";
import {OrderJean} from "../../../models/OrderJean";
import {OrderService} from "../../../services/order.service";

@Component({
    selector: 'app-createorder',
    templateUrl: './createorder.component.html',
    styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent implements OnInit {
    public categorySelect = new FormControl();
    public styleNameSelect = new FormControl();
    public fabricSelect = new FormControl();
    public washingSelect = new FormControl();
    public productCodeSelect = new FormControl();
    public amountInput = new FormControl(1);

    public categories = new Set();
    public styleNames = new Set();
    public fabrics = new Set();
    public washings = new Set();
    public productCodes = new Set();

    private jeans: Jean[];
    rows = [];
    public loading = true;
    public order: Order;

    constructor(
        private toastr: ToastrService,
        private salesService: SalesSbService,
        private dialog: MatDialog,
        private orderService: OrderService
    ) {
        // tslint:disable-next-line:new-parens
        this.order = new Order(0, "", new Date(), sessionStorage.getItem("username"), "Pending", null);
        this.loading = true;
        this.salesService.restGetJean().subscribe(
            (jeans) => {
                this.jeans = jeans;
                this.loading = false;

                this.categories.clear();
                jeans.forEach(jean => this.categories.add(jean.productCategory));
            },
            (error) => {
                // TODO: handle error
            },
        );
    }

    // tslint:disable-next-line:typedef
    showSuccessOrder() {

    }

    ngOnInit(): void {
    }

    createRow(dialogRef): void {
        this.dialog.open(dialogRef).beforeClosed().subscribe((result) => {
            if (result) {
                console.log(result, this.productCodeSelect.value, this.amountInput.value);
                this.rows.push({
                    productCode: this.productCodeSelect.value,
                    amount: this.amountInput.value,
                });
            } else {
                console.log("false", this.productCodeSelect.value, this.amountInput.value);
            }
        });
    }

    removeRow(index): void {
        if (index + 1 > this.rows.length) {
            // index out of bounds
            return;
        }
        console.log(index);
        this.rows.splice(index, 1);
    }

    // tslint:disable:no-switch-case-fall-through
    resetSelections(input: string): void {
        switch (input) {
            case 'category':
                this.categories.clear();
                break;
            case 'styleName':
                this.styleNames.clear();
                break;
            case 'fabric':
                this.fabrics.clear();
                break;
            case 'washing':
                this.washings.clear();
                break;
            case 'productCode':
                this.productCodes.clear();
                break;
        }
    }

    categorySelectChange(): void {
        const category = this.categorySelect.value;

        // empty style names before adding style names for selected category
        this.resetSelections('styleName');

        // populate styles for current category
        this.jeans.filter(jean => {
            return jean.productCategory === category;
        }).forEach(jean => {
            this.styleNames.add(jean.styleName);
        });
    }

    styleNameSelectChange(): void {
        const category = this.categorySelect.value;
        const styleName = this.styleNameSelect.value;

        // empty style names before adding style names for selected category
        this.resetSelections('fabric');

        // populate styles for current category
        this.jeans.filter(jean => {
            return jean.productCategory === category && jean.styleName === styleName;
        }).forEach(jean => {
            this.fabrics.add(jean.fabric);
        });
    }

    fabricSelectChange(): void {
        const category = this.categorySelect.value;
        const styleName = this.styleNameSelect.value;
        const fabric = this.fabricSelect.value;

        // empty style names before adding style names for selected category
        this.resetSelections('washing');

        // populate styles for current category
        this.jeans.filter(jean => {
            return (
                jean.productCategory === category &&
                jean.styleName === styleName &&
                jean.fabric === fabric
            );
        }).forEach(jean => {
            this.washings.add(jean.washing);
        });
    }

    washingSelectChange(): void {
        const category = this.categorySelect.value;
        const styleName = this.styleNameSelect.value;
        const fabric = this.fabricSelect.value;
        const washing = this.washingSelect.value;

        // empty style names before adding style names for selected category
        this.resetSelections('productCode');

        // populate styles for current category
        this.jeans.filter(jean => {
            return (
                jean.productCategory === category &&
                jean.styleName === styleName &&
                jean.fabric === fabric &&
                jean.washing === washing
            );
        }).forEach(jean => {
            this.productCodes.add(jean.productCode);
        });
    }

    // tslint:disable-next-line:typedef
    placeNewOrder() {
        const array = this.getToOrder();
        for (const item of array) {
            this.order.addToOrder(item);
        }
        // @ts-ignore
        this.order.note = document.getElementById("exampleFormControlTextarea1").value;
        console.log(this.order);
        this.orderService.addOrder(this.order).subscribe(
            (data) => {
                console.log(data);
                this.toastr.success('You placed your order', 'Successfully created an order');
                this.order = new Order(0, "", new Date(), sessionStorage.getItem("username"), "Pending", null);
            }, (error => {
                console.error(error);
                this.toastr.error('Could not place your order', 'Error');
            })
        );
    }

    getToOrder(): OrderJean[] {
        const array = [];
        for (const item of this.rows) {

            // @ts-ignore
            const jean: Jean = new Jean();
            jean.productCode = item.productCode;
            const oj: OrderJean = new OrderJean(jean, item.amount);
            array.push(oj);
        }
        return array;
    }
}
