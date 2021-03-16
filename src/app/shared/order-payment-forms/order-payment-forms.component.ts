import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyValidators } from '@utils/validators';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import {
  GeoLocationService,
  Location,
} from '@services/geo-location/geo-location.service';
import { OrderPaymentForm } from '@interfaces/components-options/order.options.interface';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-payment-forms',
  templateUrl: './order-payment-forms.component.html',
  styleUrls: ['./order-payment-forms.component.scss'],
})
export class OrderPaymentFormsComponent implements OnInit {
  step = 1;
  isAllowedSecondStep = false;
  regions: SelectOptionRegion[] = [];
  communes: SelectOption[] = [];

  // AGM's data
  @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  actualLocationData: Location;

  paymentInfo = new FormGroup({
    region: new FormControl('', [Validators.required]),
    comuna: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    hospedaje: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g),
    ]),
    rut: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/),
    ]),
    nombreDireccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    paymentOption: new FormControl('', [Validators.required]),
    latitud: new FormControl(0),
    longitud: new FormControl(0),
  });

  buttonSubmitWasCLicked = false;

  optionPayment = [
    {
      name: 'tarjeta de débito (redcompra webpay)',
      image: 'assets/images/webpay-brand.png',
      data: {
        id: 1,
      },
    },
    {
      name: 'Paypal',
      image: 'assets/images/webpay-brand.png',
      data: {
        id: 2,
      },
    },
  ];

  @Input() buttonDisabled = false;

  @Output() submitForm = new EventEmitter<OrderPaymentForm>();
  @Output() currentStep = new EventEmitter<number>();

  constructor(
    private paymentService: PaymentProcessService,
    private userService: UsuarioService,
    private mapsApiLoader: MapsAPILoader,
    private geoLocationService: GeoLocationService
  ) {}

  ngOnInit(): void {
    this.geoLocationService.getLocation().then((position: Location) => {
      this.actualLocationData = position;
    });

    this.paymentInfo.valueChanges.subscribe((x) => {
      const controlsKeys = [
        'region',
        'comuna',
        'direccion',
        'hospedaje',
        'telefono',
        'rut',
        'nombreDireccion',
        'latitud',
        'longitud',
      ];

      let formControls = [];

      controlsKeys.forEach((controlKey) => {
        formControls.push(this.paymentInfo.controls[controlKey]);
      });

      if (!this.paymentInfo.valid) {
        this.isAllowedSecondStep = formControls.every((currentValue) => {
          return currentValue.errors === null;
        });
      }
    });

    this.loadDataOfSelects();
  }

  public processDataPay() {
    let formData = this.paymentInfo.value;
    if (this.paymentInfo.valid && this.step === 1) {
      this.step = 2;
    } else if (this.paymentInfo.valid && this.step === 2) {
      this.step = 2;
      this.submitForm.emit(formData);
    }
  }

  public goToNextStep() {
    if (this.isAllowedSecondStep || this.paymentInfo.valid) {
      this.step = 2;
    }
  }

  public getErrorsWithMessages(control) {
    const errorsObject = control.errors;

    if (errorsObject) {
      const keysAvailable = Object.keys(errorsObject);

      let errorMessages = [];

      if (control.dirty || this.buttonSubmitWasCLicked) {
        keysAvailable.forEach((key) => {
          switch (key) {
            case 'required':
              errorMessages.push(`Campo Obligatorio`);

              break;
            case 'minlength':
              errorMessages.push(
                `Caracteres mínimos ${errorsObject.minlength.requiredLength}`
              );

              break;
            case 'email':
              errorMessages.push(`Email invalido`);

              break;
            case 'pattern':
              if (
                errorsObject.pattern.requiredPattern ==
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
              ) {
                errorMessages.push(`Nro. Teléfono invalido`);
              } else if (
                errorsObject.pattern.requiredPattern ==
                /^[0-9]+[-|‐]{1}[0-9kK]{1}$/
              ) {
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

  public goBack() {
    this.step -= 1;
    this.currentStep.emit(this.step);
  }

  public loadDataOfSelects() {
    // aquí cargamos las opciones del select
    this.paymentService.getRegions().subscribe((resp) => {
      resp.forEach((region) => {
        const communes = region.communes.map((commune) => {
          return {
            value: commune.id,
            label: commune.name,
          };
        });

        this.regions.push({
          value: region.id,
          label: region.name,
          communes,
        });
      });
    });

    this.controlRegionChanges();
    this.preLoadContactData();
  }

  public controlRegionChanges() {
    this.paymentInfo.controls.region.valueChanges.subscribe((regionChange) => {
      this.getCommunesOfRegion(regionChange);
    });
  }

  public getCommunesOfRegion(regionChange) {
    console.log('getCommunesOfRegion');
    console.log(regionChange);
    regionChange = parseInt(regionChange);

    const regionSelected = this.regions.find(
      (region) => region.value === regionChange
    );

    if (regionSelected) {
      this.communes = regionSelected.communes;
    } else {
      this.communes = [];
    }
  }

  public preLoadContactData() {
    // pre cargar datos de cada campo de contacto del usuario

    // Y con la api order_contact creamos una nueva dirección en donde el recibirá el paquete
    // así no tendrá que ser igual la dirección de contact del usuario con la de donde quiere que llegue
    // el paquete.

    this.userService.getContact().subscribe((contactResp) => {
      const controls = this.paymentInfo.controls;

      const contactRespKeys = [
        // determinamos los valores necesarios
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

      contactRespKeys.forEach((contactRespKey) => {
        // solo utilizaremos los valores necesarios

        const contactValue = contactResp[contactRespKey];
        console.log('preLoadContactData - ' + contactRespKey);
        console.log(contactValue);
        if (contactValue) {
          // Validamos que no contenta valores null

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
              controls.latitud.setValue(this.actualLocationData.markers[0].lat);

              break;

            case 'address_longitude':
              controls.latitud.setValue(this.actualLocationData.markers[0].lng);

              break;

            default:
              break;
          }
        }
      });

      controls.nombreDireccion.setValue('Mi residencia');
      controls.paymentOption.setValue(1);
    });
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
