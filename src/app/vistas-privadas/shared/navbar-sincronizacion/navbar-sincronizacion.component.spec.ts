import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSincronizacionComponent } from './navbar-sincronizacion.component';

describe('NavbarSincronizacionComponent', () => {
  let component: NavbarSincronizacionComponent;
  let fixture: ComponentFixture<NavbarSincronizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSincronizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
