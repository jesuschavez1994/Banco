import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-payment-forms',
  templateUrl: './order-payment-forms.component.html',
  styleUrls: ['./order-payment-forms.component.scss']
})
export class OrderPaymentFormsComponent implements OnInit {

  step = 1;
  form = new FormGroup({
    location: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor() { }

  ngOnInit(): void {
  }

  public processDataPay(){
    const formData = {
      location: this.form.value.location
    };

    console.log(formData);
  }

}
