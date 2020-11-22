import { TestBed } from '@angular/core/testing';

import { SincronizacionService } from './sincronizacion.service';

describe('SincronizacionService', () => {
  let service: SincronizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SincronizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
