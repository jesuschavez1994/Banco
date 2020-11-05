import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Description } from '@classes/descriptionStore.class';
import { UserStoreService } from '@services/user-store/user-store.service';

@Component({
  selector: 'app-contact-description',
  templateUrl: './contact-description.component.html',
  styleUrls: ['../../contact/contact.component.css']
})
export class ContactDescriptionComponent implements OnInit {

  dataStore: any[] = [];
  dataStoreEdit: any[] = [];

  description: Description[] = [];

  constructor(public dialog: MatDialog, public userStoreServices: UserStoreService) { }

  ngOnInit() {

    this.userStoreServices.getStoreAccountEdit(localStorage.getItem('id')).subscribe( data => {
      this.dataStore = data;
      this.traerdata();
    });

  }

  editarDescription(){}

  async traerdata(){
    await this.userStoreServices
    .getDataStore(localStorage.getItem('id'), this.dataStore[0].id)
    .subscribe( ( resp: any ) => {
      // tslint:disable-next-line: no-string-literal
      this.dataStoreEdit.push(resp);
      console.log('información de contacto', this.dataStoreEdit);
      // this.guardarStorage( this.dataStoreEdit );

    });
  }

}
