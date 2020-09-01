import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';


declare const gapi: any;
// import swal from 'sweetalert';


@Component({
  selector: 'app-buttom-google-register',
  templateUrl: './buttom-google-register.component.html',
  styleUrls: ['./buttom-google-register.component.css']
})
export class ButtomGoogleRegisterComponent implements OnInit {

  usuario: Usuario;
  token: string;

  auth2: any;

  constructor(
    public usuarioServices: UsuarioService,
    public router: Router
  ) { }

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

    // tslint:disable-next-line: no-inferrable-types
    const role:string = 'store';

    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log(profile);
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioServices.RegisterGoogle(
        profile.getName(),
        profile.getEmail(),
        role
      );
    });

  }

}
