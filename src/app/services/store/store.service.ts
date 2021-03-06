import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistroEmpresa } from '@models/rut.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AvailabilityUser } from '@models/validators/availabilityUser.model';
import { AvailabilityEmail } from '@models/validators/availabilityEmail.model';

// IMPORTACIONES PARA USAR EL PATRÓN REDUX //
import { UserStore } from '@models/models-@ngrx/userStore.models';
import { ActivarLoadingAction } from '../../shared/ui.accions';
import { DesactivarLoadingAction } from '../../shared/ui.accions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SetUserAction } from '../../Login/auth/auth.actions';
import { Usuario } from 'src/app/models/usuario.model';
import { Service } from '@services/service.service';
import { StoreResponse } from '@interfaces/store.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService extends Service{


  respServidor: any ;
  usuario: Usuario;
  token: string;
  headers: any;


  constructor(
    protected http: HttpClient,
    private store: Store<AppState>,
    private router: Router,

  ) {
    super(http);
    this.cargarStorage();
  }

  // private postQuery<T>(query: string, data: any){
  //   query = URL_SERVICIOS + query;
  //   return this.http.post<T>( query, data );
  // }

  // private execQuery<T>( query: string ) {
  //   query = URL_SERVICIOS + query;
  //   return this.http.get<T>( query );
  // }

  // private DeleteQuery<T>( query: string ) {
  //   query = URL_SERVICIOS + query;
  //   return this.http.delete<T>( query );
  // }

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

    const url = 'signup';

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
        swal({
          text: 'El correo ya ha sido registrado',
          icon: 'warning',
          dangerMode: true,
        });
      }

      if (err.error.errors.register) {
        swal({
          text: 'El nombre de usuario ya existe',
          icon: 'warning',
          dangerMode: true,
        });
      }

    });

  }

  usernameAvailability(name: AvailabilityUser) {
    const url = 'user_name/availability';
    return this.postQuery(url, name);
  }

  emailAvailability(email: AvailabilityEmail){
    const url = 'user_email/availability';
    return this.postQuery(url, email);
  }

  registroRut(nameStore: RegistroEmpresa){

    const url = 'signup/store';

    this.postQuery(url, nameStore).subscribe( resp => {
      window.location.href = '#/account';
      // this.router.navigate(['/account']);
      this.store.dispatch(new DesactivarLoadingAction() );
    }, err => {
      console.log(err);
      swal({
          text: err.error.message,
          icon: 'warning',
          dangerMode: true,
        });
    });

  }

  estaLogueado(){
    return (this.token.length > 6 ) ? true : false;
  }

  logout() {
    const url = 'logout';
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
    const url = `users/${userId}/stores/${storeId}/schedules`;
    return this.postQuery(url, shedules);
  }

  GetShedule(userId: string, storeId: string){
    const url = `users/${userId}/stores/${storeId}/schedules`;
    return this.execQuery(url);
  }

  createProduct(userId: string, storeId: string, data: any){
    const url = `users/${userId}/stores/${storeId}/products`;
    return this.postQuery(url, data);
  }

  ImagenProduct(userId: string, storeId: string, idProduct: number, data: any){
    const url = `users/${userId}/stores/${storeId}/products/${idProduct}/images`;
    return this.postQuery(url, data);
  }

  getSpecificProduct(userId: string, storeId: string, idProduct: string){
    const url = `users/${userId}/stores/${storeId}/products/${idProduct}`;
    return this.execQuery(url);
  }

  ProductGet(userId: string, storeId: string){
    const url = `/api/users/${userId}/stores/${storeId}/products`;
    return this.execQuery(url);
  }

  geatAllProducts(userId: string, storeId: string, page?: number){
    const url = `users/${userId}/stores/${storeId}/products`  + '?page=' + page;
    return this.execQuery(url);
  }

  DeleteProduct(userId: string, storeId: string, idProduct: number){
    const url = `users/${userId}/stores/${storeId}/products/${idProduct}`;
    return this.DeleteQuery(url);
  }

  // -----
  getStoreById(idStore: any): Observable<StoreResponse> {
    return this.execQuery<StoreResponse>(`stores/${idStore}`);

  }

}