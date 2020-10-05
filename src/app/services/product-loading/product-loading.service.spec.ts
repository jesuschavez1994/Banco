import { TestBed } from '@angular/core/testing';

import { ProductLoadingService } from './product-loading.service';

describe('ProductLoadingService', () => {
  let service: ProductLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
