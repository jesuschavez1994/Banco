import { TestBed } from '@angular/core/testing';

import { GetCategorysService } from './get-categorys.service';

describe('GetCategorysService', () => {
  let service: GetCategorysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCategorysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
