import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

declare const gapi: any;


@Component({
  selector: 'app-buttom-google-sesion',
  templateUrl: './buttom-google-sesion.component.html',
  styleUrls: ['./buttom-google-sesion.component.css']
})
export class ButtomGoogleSesionComponent implements OnInit {

  auth2: any;
  @Input() text: any;

  constructor(public usuarioServices: UsuarioService) { }

  ngOnInit(): void {
    this.googleInit();

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



}
