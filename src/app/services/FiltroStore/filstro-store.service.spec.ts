import { TestBed } from '@angular/core/testing';

import { FilstroStoreService } from './filstro-store.service';

describe('FilstroStoreService', () => {
  let service: FilstroStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilstroStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
