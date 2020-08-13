import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  auth2: any;

  email: string;
  forma: FormGroup;
  isChecked: boolean = false;

  constructor( public usuarioServices: UsuarioService, public router: Router) {

    this.forma = new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      recuerdame: new FormControl(''),
    });

  }

  ngOnInit() {
    this.googleInit();


    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.isChecked = true;
    }
  }

  googleInit(){

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        clienye_id: '536569115758-6ncc5uh0o0hr6s6vmd06gn47bjiorre6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      //  let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioServices.loginGoogle(token).subscribe( resp => {
        console.log('Respuesta Google', resp);
      });
    });

  }

  loginRegister(){

  }

  Ingresar() {
    console.log(this.forma.value);
    // tslint:disable-next-line: prefer-const
    let usuario = new Usuario(
      null,
      this.forma.value.email,
      this.forma.value.username,
      this.forma.value.password
    );

    this.usuarioServices.login(usuario, this.forma.value.recuerdame).subscribe( resp => {
      console.log(this.forma.value.recuerdame);
      console.log(resp);
      this.router.navigate(['/dashboard']);
    });

  }

}
