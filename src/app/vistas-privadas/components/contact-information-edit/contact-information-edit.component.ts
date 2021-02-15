/* import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { UserStoreService } from '@services/user-store/user-store.service';
import { InformationEditStore } from '@models/InformationEditStore.model';
import { Usuario } from '@models/usuario.model';

@Component({
  selector: 'app-contact-information-edit',
  templateUrl: './contact-information-edit.component.html',
  styleUrls: ['./contact-information-edit.component.css']
})
export class ContactInformationEditComponent implements OnInit {

  @Input() forma: FormGroup;
  // tslint:disable-next-line: ban-types
  dataStore: any[] = [];
  dataStoreEdit: any[] = [];
  redesSociales: any[] = [];
  title = false;
  informationEdit: InformationEditStore;

  social: Usuario;

  usuario: Usuario;

  constructor(public userStoreServices: UserStoreService,  private formBuilder: FormBuilder) {}

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
    .subscribe( ( resp: any ) => {
      // tslint:disable-next-line: no-string-literal
      this.dataStoreEdit.push(resp.contact);
      this.redesSociales.push(resp.social);
      this.title = true;
      console.log('información de contacto', this.dataStoreEdit);
      // this.guardarStorage( this.dataStoreEdit );

    });
  }



}
 */
