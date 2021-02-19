import { Component, OnInit, Inject, Input, Output, EventEmitter  } from '@angular/core';
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
  dataStoreEdit: any;
  @Output() SocialReason = new EventEmitter<string>();

  constructor(public userStoreServices: UserStoreService) { 

    this.usuario = this.toObject;

    // this.forma = new FormGroup({
    //   social_reason: new FormControl('' , [Validators.required]),
    //   rut: new FormControl('' , [Validators.required]),
    //   name: new FormControl('', [Validators.required]),
    //   description: new FormControl('', [Validators.required]),
    // });

   }


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
      this.forma.get('social_reason').setValue(this.dataStoreEdit.social_reason);
      this.forma.get('rut').setValue(this.dataStoreEdit.rut);
      this.forma.get('name').setValue(this.dataStoreEdit.name);
      this.forma.get('description').setValue(this.dataStoreEdit.description);

      // this.guardarStorage( this.dataStoreEdit );

    });
  }

  public capturaText(termino: string){
    console.log(termino)
    // this.SocialReason.emit(termino)
  }

}
