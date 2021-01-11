import { TestBed } from '@angular/core/testing';

import { SessionSbService } from './session-sb.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {RouterTestingModule} from "@angular/router/testing";
import {environment} from "../../environments/environment";
import {User} from "../models/User";

describe('SessionSbService', () => {
  let service: SessionSbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
    });
    service = TestBed.inject(SessionSbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should check if the user is logged in',  () => {
  //   const dummyData = [
  //     {
  //       email : 'test@test.test',
  //       password: 'iamapassword2021!',
  //     }
  //   ];
  //   service.logIn('test@test.test', 'iamapassword2021!').subscribe( (res: User) => {
  //     expect(res.email).toEqual('test@test.test');
  //     expect(res.password).toEqual('iamapassword2021!');
  //   });
  //   const req = httpMock.expectOne(
  //       environment.apiUrl + "/auth" + "/login");
  //   req.flush(dummyData);
  // });
});
