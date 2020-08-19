import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Negocio } from '../../models/negocio.model';
import { RegistroEmpresa } from '../../models/rut.model';
import { Router } from '@angular/router';

// IMPORTACIONES PARA USAR EL PATRÓN REDUX //
import { UserStore } from '../../models/models-@ngrx/userStore.models';
import { ActivarLoadingAction } from '../../shared/ui.accions';
import { DesactivarLoadingAction } from '../../shared/ui.accions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SetUserAction } from '../../Login/auth/auth.actions';


// const httpOptions = {
//   headers: new HttpHeaders({
//   'Content-Type': 'application/json',
//   Authorization: 'Bearer ' + localStorage.getItem('token'),
//   Accept: 'application/json'
//   })
// };


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // headers = new Headers();
  respServidor: any ;

  user: Negocio;
  token: string;
  headers: any;

  constructor(
    public http: HttpClient,
    private store: Store<AppState>,
    private router: Router
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
      this.user = JSON.parse( localStorage.getItem('usuario') );

    } else {
      this.token = '';
      this.user = null;

    }

  }

  guardarStorage(id: string, token: string, negocio: Negocio){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(negocio));

    this.user = negocio;
    this.token = token;
  }

  async crearStore(store: Negocio){

    const url = '/api/signup';

    try{
      await this.postQuery(url, store).subscribe( userStore => {
        console.log('STORE', userStore);

         // Redux//
        this.respServidor = userStore;
        const storeconnect = new UserStore(this.respServidor.user);
        this.store.dispatch(new SetUserAction(storeconnect));
        this.store.dispatch( new ActivarLoadingAction() );
        // End Redux//

        this.guardarStorage(this.respServidor.user.id, this.respServidor.remember_token, this.respServidor.user);
        this.router.navigate(['/rut-store']);

      });
    }catch (err){
      console.log(err);
    }

  }


  async registroRut(rut: RegistroEmpresa){

    const url = '/api/signup/store';

    try{
      await this.postQuery(url, rut).subscribe( resp => {
        this.router.navigate(['/account']);
        this.store.dispatch(new DesactivarLoadingAction() );
      });
    }catch (err){
      console.log(err);
    }
  }

  estaLogueado(){
    return (this.token.length > 6 ) ? true : false;
  }

  logout() {
    const url = '/api/logout';
    return this.execQuery(url).subscribe( data => {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('usuario');
      this.router.navigate(['/home']);
    });
  }

}
