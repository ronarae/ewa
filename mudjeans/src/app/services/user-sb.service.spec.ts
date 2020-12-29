import { TestBed } from '@angular/core/testing';

import { UserSbService } from './user-sb.service';

describe('UserSbService', () => {
  let service: UserSbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
