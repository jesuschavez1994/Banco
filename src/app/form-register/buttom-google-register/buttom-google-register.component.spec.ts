import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomGoogleRegisterComponent } from './buttom-google-register.component';

describe('ButtomGoogleRegisterComponent', () => {
  let component: ButtomGoogleRegisterComponent;
  let fixture: ComponentFixture<ButtomGoogleRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtomGoogleRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtomGoogleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
