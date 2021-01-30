import { Injectable } from '@angular/core';
import { Usuario } from '@models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenName } from '@angular/compiler';
import swal from 'sweetalert';
import { Service } from '../service.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends Service {

  usuario: Usuario;
  token: string;
  google: any;

  private useApiUrl = false;

  constructor(
    protected http: HttpClient
  ){
    super(http);
  }

  // tslint:disable-next-line: variable-name
  loginGoogle( nombre: string, email: string, user_id: string, img: string ){

    return this.postQuery('login/google/callback', { nombre, email, user_id, img});
  }

  RegisterGoogle( name: string, email: string, role: string ){

    return this.postQuery('signup/google', { name, email, role} ).subscribe( resp => {

      this.google = resp;
      console.log('Respuesta desde Google', this.google);
      console.log(this.google);
      this.guardarStorageGoogle(this.google, this.google.user.email, this.google.user.id, this.google.remember_token);
      window.location.href = '#/rut-store';

    }, err => {
       swal({
        text: err.error.message,
        icon: 'warning',
        dangerMode: true,
       });
    }
    );
  }

  // items: any =  localStorage.getItem('usuario');
  // toObject = JSON.parse(this.items);

  guardarStorageGoogle(
    usuario: Usuario,
    email: string,
    id: string,
    token: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);

    this.usuario = usuario;
    // this.token = token;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    // Prueba para mantener el estado de las páginas en "/settings/plans"
    localStorage.setItem('settingsActualPage', 'plans');

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recordar: boolean = false) {
    // Prueba para mantener el estado de las páginas en "/settings/plans"
    localStorage.setItem('settingsActualPage', 'plans');

    const url = 'login';

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.postQuery(url, usuario);
  }

  crearUsuario( usuario: Usuario ) {
    const url = '/usuario';
    // return this.http.post( url, usuario );
    return this.postQuery(url, usuario, this.useApiUrl);
  }

  subirArchivo( archivo: any, userId: string, ){
    return this.postQuery( `users/${userId}/images`, archivo );
  }

  cambiarImagen(archivo: any, userId: string) {
    return this.subirArchivo(archivo, userId);
  }

  datosUserImages(userId: string){
    return this.execQuery(`users/${userId}/images`);
  }

  //
  public getIdUser(): number | null {

    if ( localStorage.getItem('token') && localStorage.getItem('id') ){

      // tslint:disable-next-line: radix
      return parseInt(localStorage.getItem('id'));

    } else {
      return null;

    }

  }
}
