import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyValidators } from '@utils/validators';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { OrderPaymentForm } from '@interfaces/components-options/order.options.interface';

@Component({
  selector: 'app-order-payment-forms',
  templateUrl: './order-payment-forms.component.html',
  styleUrls: ['./order-payment-forms.component.scss']
})
export class OrderPaymentFormsComponent implements OnInit {

  step = 1;
  isAllowedSecondStep = false;
  regions: SelectOptionRegion[] = [];
  communes: SelectOption[] = [];

  form = new FormGroup({
    // region: new FormControl('', [Validators.required, MyValidators.existInArray( this.regions.map( r => r.id ) ) ]),
    // comuna: new FormControl('', [Validators.required, MyValidators.existInArray( this.regions.map( r => r.id ) ) ]),
    region: new FormControl('', [Validators.required]),
    comuna: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10)]),
    hospedaje: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
        id: 1
      },
    },
    {
      name: 'Paypal',
      image: 'assets/images/webpay-brand.png',
      data: {
        id: 2
      },
    },
  ];

  @Input() buttonDisabled = false;

  @Output() submitForm = new EventEmitter<OrderPaymentForm>();
  @Output() currentStep = new EventEmitter<number>();

  constructor(
    private paymentService: PaymentProcessService,
    private userService: UsuarioService,
  ) {
  }

  ngOnInit(): void {

    this.form.valueChanges.subscribe(x => {

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

      }

    });

    this.loadDataOfSelects();

  }

  public processDataPay() {

    let formData;
    formData = this.form.value;

    if (!this.form.valid) {

      if (this.isAllowedSecondStep) {
        this.step = 2;
      }

    }else if (this.form.valid) {

      const paymentOption = this.optionPaymentSelected;
      formData.paymentOption = this.optionPaymentSelected;

      this.step = 2;

      this.submitForm.emit(formData);

    }

  }

  public goToNextStep() {
    if (this.isAllowedSecondStep || this.form.valid) {
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

    // console.log('getErrorsWithMessages');
    // console.log(control);

  }


  public disabledBtnSubmit() {

    if (this.step === 1 && this.isAllowedSecondStep) {

      return false;

    } else {

      return this.buttonDisabled ? this.buttonDisabled : this.form.invalid;

    }

  }

  public goToBack() {
    this.step -= 1;
    this.currentStep.emit(this.step);
  }

  public loadDataOfSelects() {

    // aquí cargamos las opciones del select
    this.paymentService.getRegions().subscribe(
      resp => {

        resp.forEach( region => {

          const communes = region.communes.map( commune => {
            return {
              value: commune.id,
              label: commune.name
            };
          });

          this.regions.push({
            value: region.id,
            label: region.name,
            communes
          });

        });

        // console.log('this.regions');
        // console.log(this.regions);

      }
    );

    this.controlRegionChanges();
    this.preLoadContactData();

  }


  public controlRegionChanges() {
    this.form.controls.region.valueChanges.subscribe(
      regionChange => {

        this.getCommunesOfRegion(regionChange);

      }
    );
  }

  public getCommunesOfRegion(regionChange) {
    console.log('getCommunesOfRegion');
    console.log(regionChange);
    // this.form.controls.region.valueChanges.subscribe(
    //   regionChange => {
    //     // tslint:disable-next-line: radix
    regionChange = parseInt(regionChange);

    const regionSelected = this.regions.find( region => region.value === regionChange );

    if (regionSelected) {
      this.communes = regionSelected.communes;

    }else {
      this.communes = [];

    }

    //   }
    // );

  }

  public preLoadContactData() {

    // pre cargar datos de cada campo de contacto del usuario

    // Y con la api order_contact creamos una nueva dirección en donde el recibirá el paquete
    // así no tendrá que ser igual la dirección de contact del usuario con la de donde quiere que llegue
    // el paquete.

    this.userService.getContact().subscribe(
      contactResp => {
        console.log('contactResp');
        console.log(contactResp);

        const controls = this.form.controls;

        const contactRespKeys = [ // determinamos los valores necesarios
          'commune',
          'direction',
          'house',
          'phone',
          'rut',
          'address_latitude',
          'address_longitude',
        ];

        // 'region',
        // 'comuna',
        // 'direccion',
        // 'hospedaje',
        // 'telefono',
        // 'rut',
        // 'nombreDireccion',
        // 'paymentOption',


        contactRespKeys.forEach(contactRespKey => { // solo utilizaremos los valores necesarios

          const contactValue = contactResp[contactRespKey];
          console.log('preLoadContactData - ' + contactRespKey);
          console.log(contactValue);
          if (contactValue) { // Validamos que no contenta valores null

            switch (contactRespKey) {

              case 'commune':

                const communeId = contactValue.id;
                const regionId = contactValue.region.id;

                controls.region.setValue(regionId);
                controls.comuna.setValue(communeId);

                this.getCommunesOfRegion(contactValue.region.id);

                break;

              case 'direction':

                controls.direccion.setValue(contactValue);

                break;

              case 'house':

                controls.hospedaje.setValue(contactValue);

                break;

              case 'phone':

                controls.telefono.setValue(contactValue);

                break;

              case 'rut':

                controls.rut.setValue(contactValue);

                break;

              case 'address_latitude':

                // Aún no hay control que guare esto

                break;

              case 'address_longitude':
                  // Aún no hay control que guare esto

                break;

              default:
                break;
            }
          }

        });

        controls.nombreDireccion.setValue('Mi residencia');
        controls.paymentOption.setValue(1);

      }
    );

  }

}


interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectOptionRegion {
  value: string | number;
  label: string;
  communes: SelectOption[];
}
