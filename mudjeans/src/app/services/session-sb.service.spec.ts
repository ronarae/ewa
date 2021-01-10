import { TestBed } from '@angular/core/testing';

import { SessionSbService } from './session-sb.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";

describe('SessionSbService', () => {
  let service: SessionSbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
    });
    service = TestBed.inject(SessionSbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
