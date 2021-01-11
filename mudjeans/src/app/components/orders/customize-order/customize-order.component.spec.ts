import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomizeOrderComponent} from './customize-order.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/Order";
import {CreateorderComponent} from "../createorder/createorder.component";
import {OrderhistoryComponent} from "../../orderhistory/orderhistory.component";
import {filter} from "rxjs/operators";
import {By} from "@angular/platform-browser";

describe('CustomizeOrderComponent', () => {
    let component: CustomizeOrderComponent;
    let fixture: ComponentFixture<CustomizeOrderComponent>;
    let filterfield;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CustomizeOrderComponent],
            imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, MatPaginatorModule,
                MatTableModule, MatProgressBarModule, NoopAnimationsModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomizeOrderComponent);
        component = fixture.componentInstance;
        filterfield = fixture.debugElement.query(By.css('#inputfield'));
        fixture.detectChanges();
    });

    it('J00: should create', () => {
        expect(component).toBeTruthy();
    });

    // Author: Jimi
    it(`J01: should render 'Customize Existing Order' as title`, () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h2').textContent).toContain('Customize Existing Order');
    });

    // Author: Jimi
    it('J02: should use list from service', () => {
        const service = fixture.debugElement.injector.get(OrderService);
        fixture.detectChanges();

        expect(service.findAll()).toEqual(component.orderService.orders);
    });

    // Author: Jimi
    it('J03: pageSize should not be zero', (done) => {
        const compiled = fixture.debugElement.nativeElement;

        expect(compiled._pageSize === 0).toBeFalse();
        done();
    });

    // Author: Jimi
    it('J04: no order should be selected', () => {
        expect(component.currentOrder).toBeNull();
    });


    // Author: Wang
    it('should filter', (done) => {
        const compiled = fixture.debugElement.nativeElement;

        fixture = TestBed.createComponent(CustomizeOrderComponent);
        fixture.detectChanges();

        expect(compiled.applyFilter === 0).toBeFalse();
        done();
    });

    // Author: Wang
    it("Filter on orderid", (done) => {
        fixture.whenStable().then(() => {
            const compiled = fixture.debugElement.nativeElement;
            filterfield.nativeElement.value = "66";
            filterfield.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(component.rows > 0).toBeFalse();
        });
        done();
    });
});
