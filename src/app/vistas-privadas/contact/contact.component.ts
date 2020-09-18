import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataStore } from '../../models/dataStore.model';
import {MatSnackBar} from '@angular/material/snack-bar';

declare let $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);

  forma: FormGroup;
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


  Day = [
    {
      dia: 'Lunes',
      isChecked: this.estado,
    },
    {
      dia: 'Martes',
      isChecked: this.estado,
    },
    {
      dia: 'Miercoles',
      isChecked: this.estado,
    },
    {
      dia: 'Jueves',
      isChecked: this.estado,
    },
    {
      dia: 'Viernes',
      isChecked: this.estado,
    },
    {
      dia: 'Sabado',
      isChecked: this.estado,
    },
    {
      dia: 'Domingo',
      isChecked: this.estado,
    }
  ];




  // tslint:disable-next-line: ban-types
  dataStore: any[] = [];

  constructor(public userStoreServices: UserStoreService,
              public snackBar: MatSnackBar) {

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

  }

  ngOnInit(){
    this.traerIdStore();
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

  toogle(e, index){

    switch (index){
      case 0:
        return  this.Day[0].isChecked = 'Abierto';
      case 1:
        return  this.Day[1].isChecked = 'Abierto';
      case 2:
        return  this.Day[2].isChecked = 'Abierto';
      case 3:
        return  this.Day[3].isChecked = 'Abierto';
      case 4:
        return  this.Day[4].isChecked = 'Abierto';
      case 5:
        return  this.Day[5].isChecked = 'Abierto';
      case 6:
        return  this.Day[6].isChecked = 'Abierto';
    }

  }

}

