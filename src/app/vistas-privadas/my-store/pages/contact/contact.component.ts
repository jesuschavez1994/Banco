import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { UserStoreService } from '@services/user-store/user-store.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataStore, Shedules } from '@models/dataStore.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from '@services/store/store.service';
import { Title } from '@angular/platform-browser';
import {
  AnchorsMenu,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface';
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service';

declare let $: any;

const botonGuardar: HTMLButtonElement = document.querySelector('#guardar');

function enviarFormulario() {
  // tslint:disable-next-line: prefer-const
  let formulario = [];
  for (let i = 0; i < 6; i++) {
    // tslint:disable-next-line: prefer-const
    let formularioConstante: HTMLFormElement = document.querySelector(
      '#createForms' + i
    );
    formulario[i] = formularioConstante;
    formulario[i].submit();
    console.log(formulario[i]);
  }
}

switch (document.readyState) {
  case 'complete':
    botonGuardar.addEventListener('click', enviarFormulario);
    break;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  // imgsBanners: BannerOptions = {
  //   m: 'assets/img/Banner/Banner1.svg'
  // };

  imgsBanners = 'assets/img/Banner/Banner1.svg';

  @ViewChild('sheduleform') formulario: HTMLFormElement;

  // ========== PARAMETROS PARA EL USO DEL HORARIO ============/////
  // time: NgbTimeStruct = {hour: 12, minute: 30, second: 0};
  times = new Date();
  times2 = new Date();
  // ========== END PARAMETROS PARA EL USO DEL HORARIO ============/////
  // formulario: HTMLFormElement;

  forma: FormGroup;
  schedule: FormGroup;
  MatSlide: FormGroup;

  showShedule = true;
  name: any = null;
  title = false;
  nameTienda: any;
  openIsLunes: any;
  // tslint:disable-next-line: variable-name
  adress_lat: any;
  // tslint:disable-next-line: variable-name
  adress_lng: any;
  cardShimmerInputs = true;
  editar = false;
  editarDescripcion = false;
  estado = 'Cerrado';
  enviaForm = false;

  // Arrays para el horario de la tIenda //
  ArrayDays: any[] = [];
  TimeSelect: any[] = [];
  MyArrayOfDay: any[] = [];
  TimeSelectModificado: any[];
  dias: any[] = [];
  array: any[] = [];
  ArrayGlobal: any[] = [];
  SchedulesEnd: any[] = [];
  quitarValueUndefined: any[] = [];

  Day = [
    {
      dia: 'Lunes',
      isChecked: this.estado,
      selectOpenHour: this.times,
      selectCloseHour: this.times,
      lateShiftOpen: this.times2,
      lateShiftClose: this.times2,
    },
    {
      dia: 'Martes',
      isChecked: this.estado,
      selectOpenHour: this.times,
      selectCloseHour: this.times,
      lateShiftOpen: this.times2,
      lateShiftClose: this.times2,
    },
    {
      dia: 'Miercoles',
      isChecked: this.estado,
      selectOpenHour: this.times,
      selectCloseHour: this.times,
      lateShiftOpen: this.times2,
      lateShiftClose: this.times2,
    },
    {
      dia: 'Jueves',
      isChecked: this.estado,
      selectOpenHour: this.times,
      selectCloseHour: this.times,
      lateShiftOpen: this.times2,
      lateShiftClose: this.times2,
    },
    {
      dia: 'Viernes',
      isChecked: this.estado,
      selectOpenHour: this.times,
      selectCloseHour: this.times,
      lateShiftOpen: this.times2,
      lateShiftClose: this.times2,
    },
    {
      dia: 'Sabado',
      isChecked: this.estado,
      selectOpenHour: this.times,
      selectCloseHour: this.times,
      lateShiftOpen: this.times2,
      lateShiftClose: this.times2,
    },
    {
      dia: 'Domingo',
      isChecked: this.estado,
      selectOpenHour: this.times,
      selectCloseHour: this.times,
      lateShiftOpen: this.times2,
      lateShiftClose: this.times2,
    },
  ];

  // tslint:disable-next-line: ban-types
  dataStore: any[] = [];
  // Sidebar related parameters
  sidebarSections: SidebarSections;
  anchorsMenu: AnchorsMenu[] = [];

  constructor(
    public userStoreServices: UserStoreService,
    public storeService: StoreService,
    public snackBar: MatSnackBar,
    config: NgbTimepickerConfig,
    private titleService: Title,
    private _sidebarListService: SidebarListService
  ) {
    config.seconds = false;
    config.spinners = true;

    this.forma = new FormGroup({
      social_reason: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      rut: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email_1: new FormControl('', [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      email_2: new FormControl('', [
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      phone_1: new FormControl('', [Validators.minLength(10)]),
      phone_2: new FormControl('', [Validators.minLength(10)]),
      webside: new FormControl('', [Validators.minLength(5)]),
      direction: new FormControl('', [Validators.minLength(5)]),
      facebook: new FormControl('', [Validators.minLength(5)]),
      instagram: new FormControl('', [Validators.minLength(5)]),
      twitter: new FormControl('', [Validators.minLength(5)]),
      address_latitude: new FormControl(),
      address_longitude: new FormControl(),
    });

    this.schedule = new FormGroup({
      open0: new FormControl('', Validators.required),
      close0: new FormControl('', Validators.required),
      open1: new FormControl('', Validators.required),
      close1: new FormControl('', Validators.required),
      open2: new FormControl('', Validators.required),
      close2: new FormControl('', Validators.required),
      open3: new FormControl('', Validators.required),
      close3: new FormControl('', Validators.required),
      open4: new FormControl('', Validators.required),
      close4: new FormControl('', Validators.required),
      open5: new FormControl('', Validators.required),
      close5: new FormControl('', Validators.required),
      open6: new FormControl('', Validators.required),
      close6: new FormControl('', Validators.required),
    });

    this.MatSlide = new FormGroup({
      slide0: new FormControl(),
      slide1: new FormControl(),
      slide2: new FormControl(),
      slide3: new FormControl(),
      slide4: new FormControl(),
      slide5: new FormControl(),
      slide6: new FormControl(),
    });
  }

  ngOnInit() {
    this.traerIdStore();
    console.log(this.Day);

    this.loadAnchorsMenuData();
    this.setSidebarSections();
  }

  SocialReason(event: string) {
    console.log(event);
  }

  async traerIdStore() {
    await this.userStoreServices
      .getStoreAccountEdit(localStorage.getItem('id'))
      .subscribe((data) => {
        this.dataStore = data;
        this.setTitle('Founduss | ' + ' ' + this.dataStore[0].name);
        this.nameTienda = this.dataStore[0].name;
        this.cardShimmerInputs = false;
        this.title = true;
      });
  }

  actualizarDatosStore() {
    this.forma.get('address_latitude').setValue(this.adress_lat);
    this.forma.get('address_longitude').setValue(this.adress_lng);

    const data = new DataStore(
      this.forma.value.social_reason,
      this.forma.value.rut,
      this.nameTienda,
      this.forma.value.description,
      this.forma.value.email_1,
      this.forma.value.email_2,
      this.forma.value.phone_1,
      this.forma.value.phone_2,
      this.forma.value.webside,
      this.forma.value.direction,
      this.forma.value.facebook,
      this.forma.value.instagram,
      this.forma.value.twitter,
      this.forma.value.address_latitude,
      this.forma.value.address_longitude
    );

    this.userStoreServices
      .ActualizarDataStore(
        localStorage.getItem('id'),
        this.dataStore[0].id,
        data
      )
      .subscribe((resp) => {
        this.snackBar.open('Cambios Guardados', 'cerrar', { duration: 3000 });
      });

    console.log(this.forma);
  }

  Actualizar() {
    //
  }

  adress_latitude(e) {
    console.log('lat', e);
    return (this.adress_lat = e);
  }
  adress_longitude(e) {
    console.log('lng', e);
    return (this.adress_lng = e);
  }

  atras() {
    this.editar = false;
  }

  Editar() {
    this.editar = true;
  }

  EditarDescripcion() {
    this.editarDescripcion = true;
  }

  atrasDescripcion() {
    this.editarDescripcion = false;
  }

  EditarHorario() {
    this.showShedule = false;
  }

  atrasHorario() {}

  SendSchedule() {}

  enviarShedules() {
    console.log(this.schedule.value);
    // tslint:disable-next-line: prefer-for-of

    // data => Contruimos un array de objeto de tal forma
    // que se vaya armando a través de las funciones IsOpen() y IsClose()
    //
    let data = [
      {
        day: 'Lunes',
        open: this.IsOpen(this.Day[0].dia),
        close: this.IsClose(this.Day[0].dia),
      },
      {
        day: 'Martes',
        open: this.IsOpen(this.Day[1].dia),
        close: this.IsClose(this.Day[1].dia),
      },
      {
        day: 'Miercoles',
        open: this.IsOpen(this.Day[2].dia),
        close: this.IsClose(this.Day[2].dia),
      },
      {
        day: 'Jueves',
        open: this.IsOpen(this.Day[3].dia),
        close: this.IsClose(this.Day[3].dia),
      },
      {
        day: 'Viernes',
        open: this.IsOpen(this.Day[4].dia),
        close: this.IsClose(this.Day[4].dia),
      },
      {
        day: 'Sabado',
        open: this.IsOpen(this.Day[5].dia),
        close: this.IsClose(this.Day[5].dia),
      },
      {
        day: 'Domingo',
        open: this.IsOpen(this.Day[6].dia),
        close: this.IsClose(this.Day[6].dia),
      },
    ];

    // Filtramos el arreglo data para no enviar parametro vacios y indefinidos
    let newArray = new Shedules(
      data.filter(
        (filter) =>
          filter.open != '' &&
          filter.close != '' &&
          filter.open != undefined &&
          filter.close != undefined
      )
    );

    console.log(newArray);

    this.storeService
      .Shedule(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        newArray
      )
      .subscribe((resp) => {
        this.showShedule = true;
        console.log(resp);
        this.snackBar.open('El horario se ha guradado exitosamente', 'cerrar', {
          duration: 5000,
        });
      });
  }

  // isOpen Chequea si el valor del campo esta vacio => Si no es vacio es decir
  // Si el <mat-slide-toggle></mat-slide-toggle> => "Componente de angular Material" se abre emtonces ya el valor del campo deja de ser vacio dado que estamos usando new Date()
  // El cual coloca por defecto la hora del sistema; Aunado a eso esta Función al igual que IsClose() verifican
  // Si el <mat-slide-toggle></mat-slide-toggle> => "Componente de angular Material" está abierto ya que si está cerrado quiere decir que ese valor no se enviara y la tienda
  // no va a laborar ese día dado que cerro el <mat-slide-toggle></mat-slide-toggle> => "Componente de angular Material"
  IsOpen(day: string) {
    switch (day) {
      case 'Lunes':
        if (
          this.schedule.get('open0').value != '' &&
          this.MatSlide.get('slide0').value === true
        ) {
          return this.schedule.get('open0').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('open0').setValue('');
        }
        break;

      case 'Martes':
        if (
          this.schedule.get('open1').value != '' &&
          this.MatSlide.get('slide1').value === true
        ) {
          return this.schedule.get('open1').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('open1').setValue('');
        }
        break;

      case 'Miercoles':
        if (
          this.schedule.get('open2').value != '' &&
          this.MatSlide.get('slide2').value === true
        ) {
          return this.schedule.get('open2').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('open2').setValue('');
        }
        break;

      case 'Jueves':
        if (
          this.schedule.get('open3').value != '' &&
          this.MatSlide.get('slide3').value === true
        ) {
          return this.schedule.get('open3').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('open3').setValue('');
        }
        break;

      case 'Viernes':
        if (
          this.schedule.get('open4').value != '' &&
          this.MatSlide.get('slide4').value === true
        ) {
          return this.schedule.get('open4').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('open4').setValue('');
        }
        break;

      case 'Sabado':
        if (
          this.schedule.get('open5').value != '' &&
          this.MatSlide.get('slide5').value === true
        ) {
          return this.schedule.get('open5').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('open5').setValue('');
        }
        break;

      case 'Domingo':
        if (
          this.schedule.get('open6').value != '' &&
          this.MatSlide.get('slide5').value === true
        ) {
          return this.schedule.get('open6').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('open6').setValue('');
        }
        break;
    }
  }

  IsClose(day: string) {
    switch (day) {
      case 'Lunes':
        if (
          this.schedule.get('close0').value != '' &&
          this.MatSlide.get('slide0').value === true
        ) {
          return this.schedule.get('close0').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('close0').setValue('');
        }
        break;

      case 'Martes':
        if (
          this.schedule.get('close1').value != '' &&
          this.MatSlide.get('slide1').value === true
        ) {
          return this.schedule.get('close1').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('close1').setValue('');
        }
        break;

      case 'Miercoles':
        if (
          this.schedule.get('close2').value != '' &&
          this.MatSlide.get('slide2').value === true
        ) {
          return this.schedule.get('close2').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('close2').setValue('');
        }
        break;

      case 'Jueves':
        if (
          this.schedule.get('close3').value != '' &&
          this.MatSlide.get('slide3').value === true
        ) {
          return this.schedule.get('close3').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('close3').setValue('');
        }
        break;

      case 'Viernes':
        if (
          this.schedule.get('close4').value != '' &&
          this.MatSlide.get('slide4').value === true
        ) {
          return this.schedule.get('close4').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('close4').setValue('');
        }
        break;

      case 'Sabado':
        if (
          this.schedule.get('close5').value != '' &&
          this.MatSlide.get('slide5').value === true
        ) {
          return this.schedule.get('close5').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('close5').setValue('');
        }
        break;

      case 'Domingo':
        if (
          this.schedule.get('close6').value != '' &&
          this.MatSlide.get('slide6').value === true
        ) {
          return this.schedule.get('close6').value.toTimeString().slice(0, 8);
        } else {
          return this.schedule.get('close6').setValue('');
        }
        break;
    }
  }

  addNewHour(index) {
    document.getElementById('addButton' + index).style.display = 'none';
    switch (index) {
      case index:
        return (document.getElementById(index).style.display = 'flex');
    }
  }

  cancel(index) {
    document.getElementById('addButton' + index).style.display = 'block';
    return (document.getElementById(index).style.display = 'none');
  }

  toogle(e, index) {
    console.log(e.checked);

    if (e.checked) {
      switch (index) {
        case index:
          return (this.Day[index].isChecked = 'Abierto');
      }
    } else {
      switch (index) {
        case index:
          return (this.Day[index].isChecked = 'Cerrado');
      }
    }
  }

  ShedulesStore(event) {
    console.log('Horario', event);

    for (let i = 0; i < event.length; i++) {
      console.log('days', event[i].open);

      if (event.length > 0) {
        switch (event[i].day) {
          case 'Lunes':
            this.MatSlide.get('slide0').setValue(true);
            this.Day[0].isChecked = 'Abierto';
            // this.Day[0].selectOpenHour = event[0].open
            break;

          case 'Martes':
            this.MatSlide.get('slide1').setValue(true);
            this.Day[1].isChecked = 'Abierto';
            break;

          case 'Miercoles':
            this.MatSlide.get('slide2').setValue(true);
            this.Day[2].isChecked = 'Abierto';
            break;

          case 'Jueves':
            this.MatSlide.get('slide3').setValue(true);
            this.Day[3].isChecked = 'Abierto';
            break;

          case 'Viernes':
            this.MatSlide.get('slide4').setValue(true);
            this.Day[4].isChecked = 'Abierto';
            break;

          case 'Sabado':
            this.MatSlide.get('slide5').setValue(true);
            this.Day[5].isChecked = 'Abierto';
            break;

          case 'Domingo':
            this.MatSlide.get('slide6').setValue(true);
            this.Day[6].isChecked = 'Abierto';
            break;
        }
      }
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadAnchorsMenuData() {
    const id = localStorage.getItem('storeId');
    this.anchorsMenu = [
      {
        anchorName: 'Contacto',
        anchorLink: `/my-store/contact`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Productos',
        anchorLink: `/my-store/product-catalogue`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Sincronización',
        anchorLink: `/my-store/sincronizacion/exportar-lista-excel`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Ventas',
        anchorLink: `/my-store/ventas`,
        wordToMatch: `products`,
      },
    ];

    // Eliminamos los enlaces de la sidebar.
    this._sidebarListService.setAnchors(this.anchorsMenu);
  }

  private setSidebarSections() {
    this.sidebarSections = {
      bussinessProfile: true,
      anchorOptions: true,
      filters: false,
    };

    this._sidebarListService.setRequiredSections(this.sidebarSections);
  }
}
