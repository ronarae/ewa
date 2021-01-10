import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateorderComponent } from './createorder.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('CreateorderComponent', () => {
  let component: CreateorderComponent;
  let fixture: ComponentFixture<CreateorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateorderComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, MatDialogModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
