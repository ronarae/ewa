import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelComponent } from './adminpanel.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";

describe('AdminpanelComponent', () => {
  let component: AdminpanelComponent;
  let fixture: ComponentFixture<AdminpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
