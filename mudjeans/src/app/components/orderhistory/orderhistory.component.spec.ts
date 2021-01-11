import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { OrderhistoryComponent } from './orderhistory.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {By} from "@angular/platform-browser";

describe('OrderhistoryComponent', () => {
  let component: OrderhistoryComponent;
  let fixture: ComponentFixture<OrderhistoryComponent>;
  let element: HTMLElement;
  let filterField;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderhistoryComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule,
        NoopAnimationsModule, MatPaginatorModule, MatTableModule],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderhistoryComponent);
    element = fixture.nativeElement; // The HTML reference
    component = fixture.componentInstance;
    filterField = fixture.debugElement.query(By.css('#inputfield'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 1 FRONT END - RONA
  it('should render title in a h1 tag', () => {
    // * arrange
    const title = 'Order History';
    const titleElement = element.querySelector('.title');
    // * act
    component.title = title;
    fixture.detectChanges();
    // * assert
    expect(titleElement.textContent).toContain(title);
  });

  // TEST 2 FRONT END - RONA
  it('should not let page size be zero', (done) => {
    // * arrange
    const compiled = fixture.debugElement.nativeElement;
    // * act
    fixture = TestBed.createComponent(OrderhistoryComponent);
    fixture.detectChanges();
    // *assert
    expect(compiled._pageSize === 0).toBeFalse();
    done();
  });

  // TEST 3 FRONT END - RONA
  it('should filter', (done) => {
    // * arrange
    const compiled = fixture.debugElement.nativeElement;
    // * act
    fixture = TestBed.createComponent(OrderhistoryComponent);
    fixture.detectChanges();
    // *assert
    expect(compiled.applyFilter === 0).toBeFalse();
    done();
  });

  it("Filter on orderid", (done) => {
    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.nativeElement;
      filterField.nativeElement.value = "64";
      filterField.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.rows > 0).toBeFalse();
    });
    done();
  });
});
