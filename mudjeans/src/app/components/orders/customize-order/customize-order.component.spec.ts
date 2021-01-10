import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeOrderComponent } from './customize-order.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";


describe('CustomizeOrderComponent', () => {
  let component: CustomizeOrderComponent;
  let fixture: ComponentFixture<CustomizeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomizeOrderComponent],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, MatPaginatorModule,
        MatTableModule, MatProgressBarModule, NoopAnimationsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
