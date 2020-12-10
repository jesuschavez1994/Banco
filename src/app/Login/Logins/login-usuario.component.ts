import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../shared/ui.accions';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit, OnDestroy {

  email: string;
  forma: FormGroup;
  isChecked: boolean = false;
  cargando: boolean;
  subscription: Subscription;

  usuario: Usuario;
  token: string;

  constructor( public usuarioServices: UsuarioService,
               public router: Router,
               private store: Store<AppState>
              )
  {

    this.forma = new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      recuerdame: new FormControl(''),
    });

  }

  ngOnInit() {

    this.subscription = this.store.select('ui').subscribe( ui => {
      this.cargando =  ui.isLoading;
     });

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.isChecked = true;
    }

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  loginRegister(){

  }

  Ingresar() {

    this.store.dispatch( new ActivarLoadingAction() );

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
      this.guardarStorage(resp.remember_token, resp.user.id);
      console.log(resp);

      switch(resp.user.role){
        case 'admin':
        return this.router.navigate(['admin']);
        case 'store':
          this.router.navigate(['/account']);
      }

      // if (resp.user.role === 'admin')
      // {
      //   this.router.navigate(['view-admin']);
      //   return;
      // }

      this.store.dispatch( new DesactivarLoadingAction() );
    });

  }

  guardarStorage(token: string, id: string){
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    // localStorage.setItem('storeId', storeId);
    this.token = token;
  }

}
