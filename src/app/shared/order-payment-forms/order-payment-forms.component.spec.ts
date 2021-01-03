import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentFormsComponent } from './order-payment-forms.component';

describe('OrderPaymentFormsComponent', () => {
  let component: OrderPaymentFormsComponent;
  let fixture: ComponentFixture<OrderPaymentFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPaymentFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
