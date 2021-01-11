import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadfileComponent } from './uploadfile.component';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";

describe('UploadfileComponent', () => {
  let component: UploadfileComponent;
  let fixture: ComponentFixture<UploadfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadfileComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Author: Wang
  it('should render "File Upload" as title', (() => {
    const titleDiv = fixture.debugElement.nativeElement.querySelector('h5');
    expect(titleDiv.textContent).toContain('File Upload');
  }));
});
