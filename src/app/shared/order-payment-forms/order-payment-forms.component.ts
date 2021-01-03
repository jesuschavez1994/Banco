import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-payment-forms',
  templateUrl: './order-payment-forms.component.html',
  styleUrls: ['./order-payment-forms.component.scss']
})
export class OrderPaymentFormsComponent implements OnInit {

  step = 2;

  constructor() { }

  ngOnInit(): void {
  }

}
