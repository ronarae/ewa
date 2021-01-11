import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {element} from "protractor";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule, FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Kaspar
  it('error div should contain the error message', () => {
    // Set new error message
    component.errorMessage = "test errormessage";
    fixture.detectChanges();

    // Get error message div from html
    const errorMessageDiv = fixture.debugElement.nativeElement.querySelector("#errorMessage");

    // Check if the error message is the same
    expect(errorMessageDiv.textContent).toEqual("test errormessage");
  });
});
