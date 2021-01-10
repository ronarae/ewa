import { TestBed } from '@angular/core/testing';

import { SalesSbService } from './sales-sb.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";

describe('SalesSbService', () => {
  let service: SalesSbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
    });
    service = TestBed.inject(SalesSbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
