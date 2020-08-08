import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  email: string;
  forma: FormGroup;

  constructor( public usuarioServices: UsuarioService, public router: Router) {

    this.forma = new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      // username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      recuerdame: new FormControl(''),
    });

  }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.forma.value.recuerdame = true;
    }
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
      console.log(resp);
      this.router.navigate(['/dashboard']);
    });

  }

}
