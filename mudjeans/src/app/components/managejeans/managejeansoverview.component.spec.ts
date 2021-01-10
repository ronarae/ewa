import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagejeansoverviewComponent } from './managejeansoverview.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";

describe('ManagejeansoverviewComponent', () => {
  let component: ManagejeansoverviewComponent;
  let fixture: ComponentFixture<ManagejeansoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagejeansoverviewComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule,
        NoopAnimationsModule, MatInputModule, MatTableModule, MatProgressBarModule, MatPaginatorModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagejeansoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
