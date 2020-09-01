import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataStore } from '../../models/dataStore.model';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  forma: FormGroup;
  name: any;

  lat = 51.678418;
  lng = 7.809007;

  // tslint:disable-next-line: ban-types
  dataStore: Object = {};

  constructor(public userStoreServices: UserStoreService) {

    this.forma = new FormGroup({
      description: new FormControl(''),
    });

  }

  ngOnInit(){
    this.userStoreServices.getStoreAccountEdit().subscribe( data => {
      this.dataStore = data;
      console.log(this.dataStore[0].id);
    });
  }

  actualizarDatosStore(){

    const data = new DataStore(
      this.forma.value.description,
    );

    this.userStoreServices.ActualizarDataStore
    (
      localStorage.getItem('id'),
      this.dataStore[0].id,
      data
    );

    console.log(this.forma);

  }

  Actualizar(){}

}
