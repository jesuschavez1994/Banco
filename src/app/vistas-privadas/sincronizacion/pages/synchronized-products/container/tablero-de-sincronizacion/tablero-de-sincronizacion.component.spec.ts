import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroDeSincronizacionComponent } from './tablero-de-sincronizacion.component';

describe('TableroDeSincronizacionComponent', () => {
  let component: TableroDeSincronizacionComponent;
  let fixture: ComponentFixture<TableroDeSincronizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroDeSincronizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroDeSincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
