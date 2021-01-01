import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSignInComponent } from './button-sign-in.component';

describe('ButtonSignInComponent', () => {
  let component: ButtonSignInComponent;
  let fixture: ComponentFixture<ButtonSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
