import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderhistoryComponent } from './orderhistory.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";

describe('OrderhistoryComponent', () => {
  let component: OrderhistoryComponent;
  let fixture: ComponentFixture<OrderhistoryComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
