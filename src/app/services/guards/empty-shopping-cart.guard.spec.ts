import { TestBed } from '@angular/core/testing';

import { EmptyShoppingCartGuard } from './empty-shopping-cart.guard';

describe('EmptyShoppingCartGuard', () => {
  let guard: EmptyShoppingCartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmptyShoppingCartGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
