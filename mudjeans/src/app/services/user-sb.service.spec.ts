import { TestBed } from '@angular/core/testing';

import { UserSbService } from './user-sb.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";

describe('UserSbService', () => {
  let service: UserSbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
    });
    service = TestBed.inject(UserSbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
