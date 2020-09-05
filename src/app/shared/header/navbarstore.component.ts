import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { StoreService } from '../../services/store/store.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbarstore',
  templateUrl: './navbarstore.component.html',
  styleUrls: ['./navbarstore.component.css']
})
export class NavbarstoreComponent implements OnInit {

  // items: any =  localStorage.getItem('usuario');
  // toObject = JSON.parse(this.items);

  usuario: Usuario;
  datosUsuario: any[] = [];

  // User: any =  localStorage.getItem('usuario');
  // toObject = JSON.parse(this.User);

  constructor(
    public userStoreServices: UserStoreService,
    public storeService: StoreService,

  ) {
    // this.usuario = this.toObject.user;
   }

  ngOnInit() {
    this.userStoreServices.getStore().subscribe(resp => {
      this.datosUsuario.push(resp);
    });
  }


buscar( ){}

}
