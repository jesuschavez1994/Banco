import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyValidators } from '../../utils/validators';

@Component({
  selector: 'app-order-payment-forms',
  templateUrl: './order-payment-forms.component.html',
  styleUrls: ['./order-payment-forms.component.scss']
})
export class OrderPaymentFormsComponent implements OnInit, OnChanges {

  step = 1;
  isAllowedSecondStep = false;
  regiones = ['hola'];

  form = new FormGroup({
    region: new FormControl('', [Validators.required, MyValidators.existInArray(this.regiones)]),
    comuna: new FormControl('', [Validators.required, MyValidators.existInArray(this.regiones)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10)]),
    hospedaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
    telefono: new FormControl('', [
      Validators.required, Validators.minLength(10),
      Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
    ]),
    rut: new FormControl('', [
      Validators.required, Validators.minLength(5),
      Validators.pattern(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/)
    ]),
    nombreDireccion: new FormControl('', [Validators.required, Validators.minLength(5)]),
    paymentOption: new FormControl('', [Validators.required]),
  });

  buttonSubmitWasCLicked = false;

  optionPaymentSelected;
  optionPayment = [
    {
      name: 'tarjeta de débito (redcompra webpay)',
      image: 'assets/images/webpay-brand.png',
      data: {
        id: 2
      },
    },
    {
      name: 'Paypal',
      image: 'assets/images/webpay-brand.png',
      data: {
        id: -1
      },
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
    this.optionPaymentSelected = this.optionPayment[0];
    // this.
    // this.ngOnChanges();
    this.form.valueChanges.subscribe(x => {
      console.log('form value changed');
      console.log(x);


      const controlsKeys = [
        'region',
        'comuna',
        'direccion',
        'hospedaje',
        'telefono',
        'rut',
        'nombreDireccion'
      ];

      let formControls;
      formControls = [];

      controlsKeys.forEach( controlKey => {
        formControls.push(this.form.controls[controlKey]);
      });

      if (!this.form.valid) {

        this.isAllowedSecondStep = formControls.every( currentValue => {
          return currentValue.errors === null;
        });

        console.log('isAllowedSecondStep');
        console.log(this.isAllowedSecondStep);
      }

    });
  }

  public processDataPay(){
    console.clear();

    const formData = {
      nombreDirección: this.form.value.nombreDireccion
    };

    console.log('form');
    console.log(this.form);

    console.log('formData');
    console.log(formData);

    // const controlsKeys = [
    //   'region',
    //   'comuna',
    //   'direccion',
    //   'hospedaje',
    //   'telefono',
    //   'rut',
    //   'nombreDireccion'
    // ];

    // let formControls;
    // formControls = [];

    // controlsKeys.forEach( controlKey => {
    //   formControls.push(this.form.controls[controlKey]);
    // });

    if (!this.form.valid) {

      // this.isAllowedSecondStep = formControls.every( currentValue => {
      //   return currentValue.errors === null;
      // });

      if (this.isAllowedSecondStep) {
        this.step = 2;
      }

    }else if (this.form.valid) {
      // aquí colocamos la ruta y enviamos los datos
      console.log('se envian los datos');
    }

  }

  public goToNextStep() {
    if (this.isAllowedSecondStep) {
      this.step = 2;
    }
  }

  public getErrorsWithMessages( control ) {

    const errorsObject = control.errors;

    if (errorsObject) {
      const keysAvailable = Object.keys(errorsObject);

      let errorMessages;
      errorMessages = [];

      if (control.dirty || this.buttonSubmitWasCLicked) {

        keysAvailable.forEach( ( key ) => {

          switch (key) {

            case 'required':

              errorMessages.push(`Campo Obligatorio`);

              break;
            case 'minlength':

              errorMessages.push(`Carácteres mínimos ${errorsObject.minlength.requiredLength}`);

              break;
            case 'email':

              errorMessages.push(`Email invalido`);

              break;
            case 'pattern':

              if (errorsObject.pattern.requiredPattern == /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g) {
                errorMessages.push(`Nro. Teléfono invalido`);

              }else if (errorsObject.pattern.requiredPattern == /^[0-9]+[-|‐]{1}[0-9kK]{1}$/) {
                errorMessages.push(`Formato Rut inválido`);
              }

              break;
            case 'existIn':

              errorMessages.push(`Selecciona una opción valida`);

              break;

          }

        });
      }

      return errorMessages;
    }

  }


  public disabledBtnSubmit() {


    if (this.step === 1 && this.isAllowedSecondStep) {

      return false;

    } else {

      return this.form.invalid;

    }

    // if (buttonSubmitWasCLicked) {

    // }

  }



}
