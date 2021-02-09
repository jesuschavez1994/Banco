import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecoverPasswordComponent } from './modal-recover-password.component';

describe('ModalRecoverPasswordComponent', () => {
  let component: ModalRecoverPasswordComponent;
  let fixture: ComponentFixture<ModalRecoverPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecoverPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
