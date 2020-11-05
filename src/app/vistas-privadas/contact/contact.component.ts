import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserStoreService } from '@services/user-store/user-store.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataStore, Shedules } from '@models/dataStore.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from '@services/store/store.service';

declare let $: any;

const botonGuardar: HTMLButtonElement = document.querySelector('#guardar');

function enviarFormulario(){
  // tslint:disable-next-line: prefer-const
  let formulario = [];
  for (let i = 0; i < 6; i++){
    // tslint:disable-next-line: prefer-const
    let formularioConstante: HTMLFormElement = document.querySelector('#createForms' + i);
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
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('sheduleform') formulario: HTMLFormElement;

  // ========== PARAMETROS PARA EL USO DEL HORARIO ============/////
  time: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  times = new Date();
  times2 = new Date();
  // ========== END PARAMETROS PARA EL USO DEL HORARIO ============/////
  // formulario: HTMLFormElement;

  forma: FormGroup;
  schedule: FormGroup;
  name: any = null;
  title = false;
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
    }
  ];

  // tslint:disable-next-line: ban-types
  dataStore: any[] = [];

  constructor(public userStoreServices: UserStoreService,
              public storeService: StoreService,
              public snackBar: MatSnackBar,
              config: NgbTimepickerConfig) {

    config.seconds = false;
    config.spinners = true;

    this.forma = new FormGroup({
      social_reason: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rut: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email_1: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      email_2: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone_1: new FormControl('', [Validators.required, Validators.minLength(10)]),
      phone_2: new FormControl('', [Validators.required, Validators.minLength(10)]),
      webside: new FormControl('', [Validators.required, Validators.minLength(5)]),
      direction: new FormControl('', [Validators.required, Validators.minLength(5)]),
      facebook: new FormControl('', [Validators.required, Validators.minLength(5)]),
      instagram: new FormControl('', [Validators.required, Validators.minLength(5)]),
      twitter: new FormControl('', [Validators.required, Validators.minLength(5)]),
      address_latitude: new FormControl(),
      address_longitude: new FormControl(),
    });


    this.schedule = new FormGroup({
      open0: new FormControl(this.times, Validators.required),
      close0: new FormControl(this.times, Validators.required),
      open1: new FormControl(this.times, Validators.required),
      close1: new FormControl(this.times, Validators.required),
      open2: new FormControl(this.times, Validators.required),
      close2: new FormControl(this.times, Validators.required),
      open3: new FormControl(this.times, Validators.required),
      close3: new FormControl(this.times, Validators.required),
      open4: new FormControl(this.times, Validators.required),
      close4: new FormControl(this.times, Validators.required),
      open5: new FormControl(this.times, Validators.required),
      close5: new FormControl(this.times, Validators.required),
      open6: new FormControl(this.times, Validators.required),
      close6: new FormControl(this.times, Validators.required),
    });

  }

  ngOnInit(){
    this.traerIdStore();
  }

  SendSchedule(){

    const data = new Shedules(
      this.quitarValueUndefined
    );

    this.storeService.Shedule(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      data)
      .subscribe( resp => {
        console.log(resp);
      });
  }

  enviarShedules(){
    // tslint:disable-next-line: prefer-for-of
    for (let count = 0; count < this.TimeSelect.length; count++){
      this.dias.push(this.TimeSelect[count].day);
      console.log(this.TimeSelect[count].day);
      console.log(this.TimeSelect.length);
    }

    console.log('ccc', this.dias);

    // Calculamos los indices de los dias//
    function IndexArray(dias){
      // tslint:disable-next-line: prefer-const
      let index = [];
      // tslint:disable-next-line: one-variable-per-declaration
      let lunes = false, martes = false,  miercoles = false, jueves = false, viernes = false, sabado = false, domingo = false;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < dias.length; i++){

        switch (dias[i]){
          case 'Lunes':
            if (lunes === false){
              console.log('LUNES', dias.lastIndexOf('Lunes'));
              if (dias.lastIndexOf('Lunes') !== -1 ){
                index.push(dias.lastIndexOf('Lunes'));
                lunes = true;
              }else{ return; }
            }
          // tslint:disable-next-line: align
          break;
          // tslint:disable-next-line: no-switch-case-fall-through
          case 'Martes':
            if (martes === false){
              console.log('MARTES', dias.lastIndexOf('Martes'));
              if (dias.lastIndexOf('Martes') !== -1){
                index.push(dias.lastIndexOf('Martes'));
                martes = true;
              }else{ return; }
            }
          // tslint:disable-next-line: align
          break;
          // tslint:disable-next-line: no-switch-case-fall-through
          case 'Miercoles':
            if (miercoles === false){
              console.log('Miercoles', dias.lastIndexOf('Miercoles'));
              if (dias.lastIndexOf('Miercoles') !== -1){
                index.push(dias.lastIndexOf('Miercoles'));
                miercoles = true;
              }else{ return; }
            }
          // tslint:disable-next-line: align
          break;
          // tslint:disable-next-line: no-switch-case-fall-through
          case 'Jueves':
            if (jueves === false){
              console.log('Jueves', dias.lastIndexOf('Jueves'));
              if (dias.lastIndexOf('Jueves') !== -1){
                index.push(dias.lastIndexOf('Jueves'));
                jueves = true;
              }else{ return; }
            }
          // tslint:disable-next-line: align
          break;
          // tslint:disable-next-line: no-switch-case-fall-through
          case 'Viernes':
            if (viernes === false){
              console.log('Viernes', dias.lastIndexOf('Viernes'));
              if (dias.lastIndexOf('Viernes') !== -1){
                index.push(dias.lastIndexOf('Viernes'));
                viernes = true;
              }else{ return; }
            }
          // tslint:disable-next-line: align
          break;
          // tslint:disable-next-line: no-switch-case-fall-through
          case 'Sabado':
            if (sabado === false){
              console.log('Sabado', dias.lastIndexOf('Viernes'));
              if (dias.lastIndexOf('Sabado') !== -1){
                index.push(dias.lastIndexOf('Sabado'));
                sabado = true;
              }else{ return; }
            }
          // tslint:disable-next-line: align
          break;
          // tslint:disable-next-line: no-switch-case-fall-through
          case 'Domingo':
            if (domingo === false){
              console.log('Domingo', dias.lastIndexOf('Domingo'));
              if (dias.lastIndexOf('Domingo') !== -1){
                index.push(dias.lastIndexOf('Domingo'));
                domingo = true;
              }else{ return; }
            }
          // tslint:disable-next-line: align
          break;
        }
      }
      return [index];
      // End Function //
    }

    // tslint:disable-next-line: prefer-const
    let indice = IndexArray(this.dias);

    function dayLaborables(arr, myArray){
       // tslint:disable-next-line: prefer-const
      let c = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arr.length; i++){
        setTimeout(() => {
          c.push(myArray[arr[i]]);
        }, 100);
        console.log('LAboral', c.push(myArray[arr[i]]));
      }
      return [c];
    }

    const Schedules = dayLaborables(indice[0], this.TimeSelect);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < Schedules[0].length; i++){
      if  (Schedules[0][i] !== 'undefined'){
        this.SchedulesEnd.push(Schedules[0][i]);
        console.log('Shedules', this.SchedulesEnd);
      }
    }

    // tslint:disable-next-line: only-arrow-functions
    this.quitarValueUndefined = this.SchedulesEnd.filter(function(dato){
      // tslint:disable-next-line: triple-equals
      return dato != undefined;
    });

    console.log('Sin Undefined', this.quitarValueUndefined);

    this.SendSchedule();
  }

  async traerIdStore(){
    await this.userStoreServices.getStoreAccountEdit(localStorage.getItem('id')).subscribe( data => {
     this.dataStore = data;
     this.cardShimmerInputs = false;
     this.title = true;
   });
  }


  actualizarDatosStore(){

    this.forma.get('address_latitude').setValue(this.adress_lat);
    this.forma.get('address_longitude').setValue(this.adress_lng);

    const data = new DataStore(
      this.forma.value.social_reason,
      this.forma.value.rut,
      this.forma.value.name,
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
      this.forma.value.address_longitude,
    );

    this.userStoreServices.ActualizarDataStore
    (
      localStorage.getItem('id'),
      this.dataStore[0].id,
      data
    );

    console.log(this.forma);

  }

  Actualizar(){
    this.snackBar.open('Cambios Guardados', 'cerrar', { duration: 3000 });
  }

  adress_latitude( e ){
    console.log('lat', e);
    return this.adress_lat = e;
  }
  adress_longitude( e ){
    console.log('lng', e);
    return this.adress_lng = e;
  }

  atras(){
    this.editar = false;
  }

  Editar(){
    this.editar = true;
  }

  EditarDescripcion(){
    this.editarDescripcion = true;
  }

  atrasDescripcion(){
    this.editarDescripcion = false;
  }

  EditarHorario(){}

  atrasHorario(){}

  log(time: Date, i, day: string) {
    this.schedule.get('open' + i).valueChanges.subscribe( openSelect => {
      this.schedule.get('close' + i).valueChanges.subscribe( closeSelet => {
        this.TimeSelect.push({open: openSelect.toTimeString().slice(0, 8), close: closeSelet.toTimeString().slice(0, 8), day});
        console.log(this.TimeSelect);
        return this.TimeSelect;
      });
    });
  }

  addNewHour(index){
    document.getElementById('addButton' + index).style.display = 'none';
    switch (index){
      case index:
        return document.getElementById(index).style.display = 'flex';
    }
  }

  cancel(index){
    document.getElementById('addButton' + index).style.display = 'block';
    return document.getElementById(index).style.display = 'none';
  }

  toogle(e, index){
    if (e.checked){
      switch (index){
        case index:
          return  this.Day[index].isChecked = 'Abierto';
      }
    }else{
      switch (index){
        case index:
          return  this.Day[index].isChecked = 'Cerrado';
      }
    }
  }
}



