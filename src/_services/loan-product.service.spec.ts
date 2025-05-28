import { TestBed } from '@angular/core/testing';

import { LoanProductService } from './loan-product.service';

describe('LoanProductService', () => {
  let service: LoanProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
