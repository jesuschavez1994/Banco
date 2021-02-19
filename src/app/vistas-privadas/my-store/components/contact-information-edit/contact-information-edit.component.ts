import { Component, OnInit, Input } from '@angular/core';
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

  ValueCampo(text: string){
    console.log(text);
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
      console.log('información de contacto', this.dataStoreEdit[0]);
      console.log('Redes', this.redesSociales)
      
      if ( this.dataStoreEdit[0].email_1 === null){
        this.forma.get('email_1').setValue('');
      }else{
        this.forma.get('email_1').setValue(this.dataStoreEdit[0].email_1);
      }

      if(this.dataStoreEdit[0].email_2 === null){
        this.forma.get('email_2').setValue('');
      }else{
        this.forma.get('email_2').setValue(this.dataStoreEdit[0].email_2);
      }

      if(this.dataStoreEdit[0].phone_1 === null){
        this.forma.get('direction').setValue('');
      }else{
        this.forma.get('direction').setValue(this.dataStoreEdit[0].direction);
      }

      if(this.dataStoreEdit[0].phone_1 === null){
        this.forma.get('phone_1').setValue('');
      }else{
        this.forma.get('phone_1').setValue(this.dataStoreEdit[0].phone_1);
      }

      if(this.dataStoreEdit[0].phone_2 === null){
        this.forma.get('phone_2').setValue('');
      }else{
        this.forma.get('phone_2').setValue(this.dataStoreEdit[0].phone_2);
      }

      if(this.dataStoreEdit[0].webside === null){
        this.forma.get('webside').setValue('');
      }else{
        this.forma.get('webside').setValue(this.dataStoreEdit[0].webside);
      }

      if(this.redesSociales[0].instagram === null){
        this.forma.get('instagram').setValue('');
      }else{
        this.forma.get('instagram').setValue(this.redesSociales[0].instagram);
      }

      if(this.redesSociales[0].twitter === null){
        this.forma.get('twitter').setValue('');
      }else{
        this.forma.get('twitter').setValue(this.redesSociales[0].twitter);
      }

    });
  }



}
