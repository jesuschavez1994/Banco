import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { StoreService } from '../../services/store/store.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';


@Component({
  selector: 'app-navbarstore',
  templateUrl: './navbarstore.component.html',
  styleUrls: ['./navbarstore.component.css']
})
export class NavbarstoreComponent implements OnInit {

  usuario: Usuario;
  datosUsuario: any[] = [];
  IMG_USER: string;

  constructor(
    public usuarioService: UsuarioService,
    public userStoreServices: UserStoreService,
    public storeService: StoreService,

  ) {
   }

  ngOnInit() {
    this.userStoreServices.getStore().subscribe( resp => {
      this.datosUsuario.push(resp);
    });

    this.usuarioService.datosUserImages(localStorage.getItem('id')).subscribe( (Response: any) => {
      this.IMG_USER = Response[0].src;
    });

  }


buscar( ){}

}
