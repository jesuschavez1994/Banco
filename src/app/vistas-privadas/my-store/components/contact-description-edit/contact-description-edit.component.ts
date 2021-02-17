import { Component, OnInit, Inject, Input  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Usuario } from '@models/usuario.model';
import { UserStoreService } from '@services/user-store/user-store.service';

@Component({
  selector: 'app-contact-description-edit',
  templateUrl: './contact-description-edit.component.html',
  styleUrls: ['../contact-information-edit/contact-information-edit.component.css']
})
export class ContactDescriptionEditComponent implements OnInit {

  @Input() forma: FormGroup;
  User: any =  localStorage.getItem('usuario');
  toObject = JSON.parse(this.User);
  usuario: Usuario;
  dataStore: any[] = [];
  dataStoreEdit = {};

  constructor(public userStoreServices: UserStoreService) { this.usuario = this.toObject; }


  ngOnInit() {
    this.userStoreServices.getStoreAccountEdit(localStorage.getItem('id')).subscribe( data => {
      this.dataStore = data;
      this.traerdata();
    });
  }

  editDescriptions(){}

  guardarCambios(){

  }

  onNoClick(): void {
  }

  async traerdata(){
    await this.userStoreServices
    .getDataStore(localStorage.getItem('id'), this.dataStore[0].id)
    .subscribe( ( resp: any ) => {
      // tslint:disable-next-line: no-string-literal
      this.dataStoreEdit = resp;
      console.log('Descripcion Edit', this.dataStoreEdit);
      // this.guardarStorage( this.dataStoreEdit );

    });
  }

}
