import { TestBed } from '@angular/core/testing';

import { SuscriptionService } from './subscription.service';

describe('SuscriptionService', () => {
  let service: SuscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
