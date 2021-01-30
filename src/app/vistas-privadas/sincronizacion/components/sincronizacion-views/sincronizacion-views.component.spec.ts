import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SincronizacionViewsComponent } from './sincronizacion-views.component';

describe('SincronizacionViewsComponent', () => {
  let component: SincronizacionViewsComponent;
  let fixture: ComponentFixture<SincronizacionViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SincronizacionViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SincronizacionViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
