import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CreateorderComponent } from './createorder.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {By} from "@angular/platform-browser";

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

  // shan test
  it('should first show the mat progress bar loading', (done) => {
    // tslint:disable-next-line:no-shadowed-variable
    const fixture = TestBed.createComponent(CreateorderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(component.loading).toBeTrue();
    done();
  });

});
