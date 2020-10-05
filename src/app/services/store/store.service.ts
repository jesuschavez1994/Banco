import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { RegistroEmpresa } from '../../models/rut.model';
import { Router } from '@angular/router';


// import swal from 'sweetalert';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


// IMPORTACIONES PARA USAR EL PATRÓN REDUX //
import { UserStore } from '../../models/models-@ngrx/userStore.models';
import { ActivarLoadingAction } from '../../shared/ui.accions';
import { DesactivarLoadingAction } from '../../shared/ui.accions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SetUserAction } from '../../Login/auth/auth.actions';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  respServidor: any ;
  usuario: Usuario;
  token: string;
  headers: any;


  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
    // tslint:disable-next-line: no-shadowed-variable

  ) {
    this.cargarStorage();
  }

  private postQuery<T>(query: string, data: any){
    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data );
  }

  private execQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.get<T>( query );
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );

    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(id: string, token: string, user: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));

    this.usuario = user;
    this.token = token;
  }

  async crearStore(user: Usuario){

    const url = '/api/signup';

    await this.postQuery(url, user).subscribe( userStore => {

      // Redux//
      this.respServidor = userStore;
      const storeconnect = new UserStore(this.respServidor.user);
      this.store.dispatch(new SetUserAction(storeconnect));
      this.store.dispatch( new ActivarLoadingAction() );
      // End Redux//

      this.guardarStorage(this.respServidor.user.id, this.respServidor.remember_token, this.respServidor);
      this.router.navigate(['/rut-store']);

    },
    err => {
      console.log(err);
      if (err.error.errors.email) {
        // swal({
        //   text: 'El correo ya ha sido registrado',
        //   icon: 'warning',
        //   dangerMode: true,
        // });
      }

      if (err.error.errors.register) {
        // swal({
        //   text: 'El nombre de usuario ya existe',
        //   icon: 'warning',
        //   dangerMode: true,
        // });
      }

    });

  }

  registroRut(nameStore: RegistroEmpresa){

    const url = '/api/signup/store';

    this.postQuery(url, nameStore).subscribe( resp => {
      window.location.href = '#/account';
      // this.router.navigate(['/account']);
      this.store.dispatch(new DesactivarLoadingAction() );
    }, err => {
      console.log(err);
      // swal({
      //     text: err.error.message,
      //     icon: 'warning',
      //     dangerMode: true,
      //   });
    });

  }

  estaLogueado(){
    return (this.token.length > 6 ) ? true : false;
  }

  logout() {
    const url = '/api/logout';
    return this.execQuery(url).subscribe( data => {
      this.usuario = null;
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('usuario');
      this.router.navigate(['/home']);
    });
  }

  Shedule(userId: string, storeId: string, shedules: any){
    const url = `/api/users/${userId}/stores/${storeId}/schedules`;
    return this.postQuery(url, shedules);
  }

  GetShedule(userId: string, storeId: string){
    const url = `/api/users/${userId}/stores/${storeId}/schedules`;
    return this.execQuery(url);
  }


}
