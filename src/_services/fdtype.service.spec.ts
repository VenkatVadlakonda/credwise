import { TestBed } from '@angular/core/testing';

import { FdtypeService } from './fdtype.service';

describe('FdtypeService', () => {
  let service: FdtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
