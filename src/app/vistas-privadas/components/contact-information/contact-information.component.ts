import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../../services/user-store/user-store.service';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {

  dataStore: any[] = [];
  dataStoreEdit: any[] = [];
  redesSociales: any[] = [];

  constructor(public userStoreServices: UserStoreService) { }

  ngOnInit() {
    this.userStoreServices.getStoreAccountEdit(localStorage.getItem('id')).subscribe( data => {
      this.dataStore = data;
      this.traerdata();
    });
  }

  async traerdata(){
    await this.userStoreServices
    .getDataStore(localStorage.getItem('id'), this.dataStore[0].id)
    .subscribe( ( resp: any ) => {
      // tslint:disable-next-line: no-string-literal
      this.dataStoreEdit.push(resp.contact);
      console.log('contacto', this.dataStoreEdit);
      this.redesSociales.push(resp.social);
      // this.guardarStorage( this.dataStoreEdit );

    });
  }

}
