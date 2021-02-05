import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWebpayPlusComponent } from './confirm-webpay-plus.component';

describe('ConfirmWebpayPlusComponent', () => {
  let component: ConfirmWebpayPlusComponent;
  let fixture: ComponentFixture<ConfirmWebpayPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmWebpayPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmWebpayPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
