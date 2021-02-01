import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../shared/ui.accions';
import { Subscription } from 'rxjs';
import { UserStoreService } from '@services/user-store/user-store.service';


@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  email: string;
  forma: FormGroup;
  isChecked: boolean = false;
  cargando: boolean;
  subscription: Subscription;

  usuario: Usuario;
  token: string;

  constructor( public usuarioServices: UsuarioService,
               public router: Router,
               public userStoreService: UserStoreService
              )
  {

    this.forma = new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      recuerdame: new FormControl(''),
    });

  }

  ngOnInit() {

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.isChecked = true;
    }

  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

  loginRegister(){

    // tslint:disable-next-line: prefer-const
    let usuario = new Usuario(
      this.forma.value.username = null,
      this.forma.value.name = null,
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioServices.login(usuario, this.forma.value.recuerdame).subscribe( (resp: any) => {
      console.log(this.forma.value.recuerdame);
      console.log('FFFF', resp);
      console.log(resp);

      if (resp.user.role === 'store')
      {
        this.userStoreService.getStoreAccountEdit(resp.user.id).subscribe( (StoreResponse: any) => {
          console.log('StoreResponse', StoreResponse);
          this.guardarStorageStore(resp.remember_token, resp.user.id, StoreResponse['0'].social.store_id);
          this.router.navigate(['account/form-account']);
        });
      }else{
        this.guardarStorage(resp.remember_token, resp.user.id);
      }

      // switch(resp.user.role){
      //   case 'admin':
      //   this.router.navigate(['admin']);
      //   break;
      //   case 'store':
      //   this.router.navigate(['account']);
      //   // window.location.href = '#/account'
      //   break;
      // }

      // if (resp.user.role === 'admin')
      // {
      //   this.router.navigate(['view-admin']);
      //   return;
      // }

    });

  }

  Ingresar() {}

  guardarStorage(token: string, id: string){
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    // localStorage.setItem('storeId', storeId);
    this.token = token;
  }

  guardarStorageStore(token: string, id: string, storeId: string){
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('storeId', storeId);
    this.token = token;
  }

}
