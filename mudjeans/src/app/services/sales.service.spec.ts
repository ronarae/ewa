import { TestBed } from '@angular/core/testing';

import { SalesService } from './sales.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
    });
    service = TestBed.inject(SalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
