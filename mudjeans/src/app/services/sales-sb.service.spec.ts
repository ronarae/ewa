import { TestBed } from '@angular/core/testing';

import { SalesSbService } from './sales-sb.service';

describe('SalesSbService', () => {
  let service: SalesSbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesSbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
