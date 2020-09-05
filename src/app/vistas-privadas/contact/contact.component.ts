import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataStore } from '../../models/dataStore.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  forma: FormGroup;
  name: any = null;
  title = false;
  // tslint:disable-next-line: variable-name
  adress_lat: any;
  // tslint:disable-next-line: variable-name
  adress_lng: any;


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
     this.title = true;
   });
  }


  actualizarDatosStore(){

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
      this.adress_lat,
      this.adress_lng,
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

  adress_latitude(e){
    console.log('lat', e);
    return this.adress_lat = e;
  }
  adress_longitude(e){
    console.log('lng', e);
    return this.adress_lng = e;
  }

}
