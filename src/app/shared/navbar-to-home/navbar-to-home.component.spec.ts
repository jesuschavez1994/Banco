import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarToHomeComponent } from './navbar-to-home.component';

describe('NavbarToHomeComponent', () => {
  let component: NavbarToHomeComponent;
  let fixture: ComponentFixture<NavbarToHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarToHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarToHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
