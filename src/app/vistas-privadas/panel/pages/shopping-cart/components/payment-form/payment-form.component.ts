import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import {
  GeoLocationService,
  Location,
} from '@services/geo-location/geo-location.service';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import {
  PaymentDetails,
  PaymentCredentials,
  MallTransactionCredentials,
} from '@interfaces/shopping-cart/shopping-cart.interface';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ConfirmWebpayPlusComponent } from '@app/modals/confirm-webpay-plus/confirm-webpay-plus.component';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  regions: SelectOptionRegion[] = [];
  communes: SelectOption[] = [];
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
  actualLocationData: Location;
  loadingLocation = true;

  constructor(
    private _formBuilder: FormBuilder,
    private geoLocationService: GeoLocationService,
    private paymentService: PaymentProcessService,
    private userService: UsuarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.paymentForm = this._formBuilder.group({
      paymentFormSteps: this._formBuilder.array([
        // Primer paso del proceso
        this._formBuilder.group({
          region: ['', [Validators.required]],
          comuna: ['', [Validators.required]],
          direccion: ['', [Validators.required, Validators.minLength(10)]],
          hospedaje: ['', [Validators.required, Validators.minLength(6)]],
          telefono: [
            '',
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(14),
              Validators.pattern(
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
              ),
            ],
          ],
        }),
        // Segundo paso del proceso
        this._formBuilder.group({
          rut: [
            '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.pattern(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/),
            ],
          ],
          aliasDireccion: ['', [Validators.required, Validators.minLength(5)]],
          latitud: [0],
          longitud: [0],
        }),
        // Ultimo paso del proceso
        this._formBuilder.group({
          metodoDePago: ['', [Validators.required]],
        }),
      ]),
    });

    this.geoLocationService.getLocation().then((position: Location) => {
      this.actualLocationData = position;
      this.loadingLocation = false;
    });

    this.loadDataOfSelects();
  }

  /*
     Retorna un Array de formularios con el nombre paymentFormArray */
  get formArray(): AbstractControl | null {
    return this.paymentForm.get('paymentFormSteps');
  }

  // Definimos getters para los formularios asi evitamos mas codigo en el HTML.
  get stepOneForms() {
    return this.formArray.get([0]);
  }

  get stepTwoForms() {
    return this.formArray.get([1]);
  }

  get stepThreeForms() {
    return this.formArray.get([2]);
  }

  private loadDataOfSelects() {
    let regionsData = [];
    this.paymentService.getRegions().subscribe((resp) => {
      resp.forEach((region) => {
        const communes = region.communes.map((commune) => {
          return {
            value: commune.id,
            label: commune.name,
          };
        });
        regionsData.push({
          value: region.id,
          label: region.name,
          communes,
        });
      });
      this.regions = regionsData;
    });

    this.preLoadContactData();
    this.controlRegionChanges();
  }

  private controlRegionChanges() {
    this.stepOneForms.get('region').valueChanges.subscribe((regionChange) => {
      this.getCommunesOfRegion(regionChange);
    });
  }

  private getCommunesOfRegion(regionChange) {
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
    this.userService.getContact().subscribe((contactInfo) => {
      // Formularios del paso uno.
      const regionId = contactInfo.commune.region_id;
      const communeId = contactInfo.commune_id;

      this.stepOneForms.get('region').setValue(regionId);
      this.stepOneForms.get('comuna').setValue(communeId);
      this.getCommunesOfRegion(contactInfo.commune.region_id);

      this.stepOneForms.get('direccion').setValue(contactInfo.direction);

      this.stepOneForms.get('hospedaje').setValue(contactInfo.house);

      this.stepOneForms.get('telefono').setValue(contactInfo.phone);

      // Formularios del paso dos.
      this.stepTwoForms.get('rut').setValue(contactInfo.rut);

      this.stepTwoForms
        .get('longitud')
        .setValue(this.actualLocationData.markers[0].lng);

      this.stepTwoForms
        .get('latitude')
        .setValue(this.actualLocationData.markers[0].lat);

      // Formularios del paso tres.
      this.stepThreeForms.get('metodoDePago').setValue(1);
    });
  }

  public processPaymentData() {
    let formData = this.paymentForm.value;

    const orderId = parseInt(localStorage.getItem('shoppingCartOrderId'));

    const recipientContact = {
      commune_id: formData.comuna,
      direction: formData.direccion,
      house: formData.hospedaje,
      phone: formData.telefono,
      rut: formData.rut,
      address_latitude: formData.latitud,
      address_longitude: formData.longitud,
      name: formData.nombreDireccion,
      // paymentOption: formData.paymentOption,
    };

    // Agregamos los datos del destinatario y su dirección de destino del producto
    this.paymentService
      .addDeliveryContact(orderId, recipientContact)
      .pipe(
        switchMap((paymentDetails: PaymentDetails) => {
          return this.paymentService
            .addPaymentToOrder(paymentDetails.order_id)
            .pipe(
              switchMap((paymentCredentials: PaymentCredentials) => {
                return this.paymentService.createTransaction(
                  paymentCredentials.id
                );
              })
            );
        })
      )
      .subscribe((mallTransactionResponse: MallTransactionCredentials) => {
        this.dialog.open(ConfirmWebpayPlusComponent, {
          data: {
            title:
              'Por favor presione el botón en la parte inferior de este mensaje para ser redirigido al sitio web de Transbank y así completar su proceso de pago.',
            mallTransaction: {
              url: mallTransactionResponse.url,
              token: mallTransactionResponse.token,
            },
          },
        });
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
