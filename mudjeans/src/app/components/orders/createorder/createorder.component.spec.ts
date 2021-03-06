import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CreateorderComponent } from './createorder.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {By} from "@angular/platform-browser";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/Order";

describe('CreateorderComponent', () => {
  let component: CreateorderComponent;
  let fixture: ComponentFixture<CreateorderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateorderComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, MatDialogModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateorderComponent);
    element = fixture.nativeElement; // The HTML reference
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // shan test
  it('should first show the mat progress bar loading', (done) => {
    // tslint:disable-next-line:no-shadowed-variable
    const fixture = TestBed.createComponent(CreateorderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(component.loading).toBeTrue();
    done();
  });

  // Author: Jimi
  it('J05: should save order',  () => {
    const service = fixture.debugElement.injector.get(OrderService);
    fixture.detectChanges();

    const order = new Order(0, '', new Date(), 'system', 'Pending', null);
    service.save(order);

    let orderInList;
    for (let i = 0; i < service.findAll().length; i++) {
      if (service.findAll()[i].idOrder === order.idOrder) {
        orderInList = service.findAll()[i];
      }
    }

    expect(orderInList).toEqual(order);
  });

  // TEST 5 FRONT END - RONA
  it('should render title in a h1 tag', () => {
    // * arrange
    const title = 'Create Order';
    const titleElement = element.querySelector('.title');
    // * act
    component.title = title;
    fixture.detectChanges();
    // * assert
    expect(titleElement.textContent).toContain(title);
  });

  // Author: Wang
  it('should render "Create Order" as title', (() => {
    const titleDiv = fixture.debugElement.nativeElement.querySelector('h2');
    expect(titleDiv.textContent).toContain('Create Order');
  }));


});
