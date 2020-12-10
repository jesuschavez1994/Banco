import { TestBed } from '@angular/core/testing';

import { BankProductService } from './bank-product.service';

describe('BankProductService', () => {
  let service: BankProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
