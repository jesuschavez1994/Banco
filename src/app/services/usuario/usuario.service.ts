import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenName } from '@angular/compiler';
// import swal from 'sweetalert';


const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  Accept: 'application/json'
  })
};

const Options = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
  Accept: 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  google: any;

  private postQuery<T>(query: string, data: any){
    query = URL_SERVICIOS + query;
    return this.http.post<T>( query, data, httpOptions );
  }

  private execQuery<T>( query: string ) {
    query = URL_SERVICIOS + query;
    return this.http.get<T>( query );
  }

  constructor(
    public http: HttpClient
  ) {
  }

  // tslint:disable-next-line: variable-name
  loginGoogle( nombre: string, email: string, user_id: string, img: string ){
    const url = '/api/login/google/callback';
    return this.postQuery(url, { nombre, email, user_id, img} );
  }

  RegisterGoogle( name: string, email: string, role: string ){
    const url = '/api/signup/google';
    return this.postQuery(url, { name, email, role} ).subscribe( resp => {
      this.google = resp;
      console.log('Respuesta desde Google', this.google);
      console.log(this.google);
      this.guardarStorageGoogle(this.google, this.google.user.email, this.google.user.id, this.google.remember_token);
      window.location.href = '#/rut-store';
    }, err => {
      // swal({
      //   text: err.error.message,
      //   icon: 'warning',
      //   dangerMode: true,
      // });
    }
    );
  }

  // items: any =  localStorage.getItem('usuario');
  // toObject = JSON.parse(this.items);

  guardarStorageGoogle(usuario: Usuario, email: string, id: string, token: string){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);

    this.usuario = usuario;
    // this.token = token;
  }


  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recordar: boolean = false){

    const url = '/api/login';

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    return this.postQuery(url, usuario);
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
    ;
  }

  subirArchivo( archivo: any, userId: string, ){
    const url = `/api/users/${userId}/images`;
    return this.postQuery( url, archivo);
  }

  cambiarImagen( archivo: any, userId: string ) {
   return this.subirArchivo(archivo, userId);
  }

  datosUserImages(userId: string){
    const query = `/api/users/${userId}/images`;
    return this.execQuery(query);
  }


}
