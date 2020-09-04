import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { UserStoreService } from '../../../services/user-store/user-store.service';
import { InformationEditStore } from '../../../models/InformationEditStore.mode';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-contact-information-edit',
  templateUrl: './contact-information-edit.component.html',
  styleUrls: ['./contact-information-edit.component.css']
})
export class ContactInformationEditComponent implements OnInit {

  @Input() forma: FormGroup;
  // tslint:disable-next-line: ban-types
  dataStore: Object = {};
  dataStoreEdit = {};
  title = false;
  informationEdit: InformationEditStore;

  social: Usuario;
  User: any =  localStorage.getItem('usuario');
  toObject = JSON.parse(this.User);
  usuario: Usuario;

  constructor(public userStoreServices: UserStoreService,  private formBuilder: FormBuilder) {

    this.usuario = this.toObject.contact;
    this.social = this.toObject.social;

  }

  ngOnInit() {

    this.userStoreServices.getStoreAccountEdit(localStorage.getItem('id')).subscribe( data => {
      this.dataStore = data;
      this.title = true;
      this.traerdata();
    });

  }

  editInformationContact(){}

  async traerdata(){
    await this.userStoreServices
    .getDataStore(localStorage.getItem('id'), this.dataStore[0].id)
    .subscribe(resp => {
      // tslint:disable-next-line: no-string-literal
      this.dataStoreEdit = resp;
      console.log('data', this.dataStoreEdit);
      this.guardarStorage( this.dataStoreEdit );

    });
  }

  guardarStorage(informationEdit: InformationEditStore){
    localStorage.setItem('usuario', JSON.stringify(informationEdit));
    this.informationEdit = informationEdit;
  }


}
