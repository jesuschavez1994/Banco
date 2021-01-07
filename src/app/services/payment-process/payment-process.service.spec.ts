import { TestBed } from '@angular/core/testing';

import { PaymentProcessService } from './payment-process.service';

describe('PaymentProcessService', () => {
  let service: PaymentProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
