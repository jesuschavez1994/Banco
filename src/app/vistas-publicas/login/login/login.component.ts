import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario;
  isChecked: boolean = false;
  email: string;
  token: string;

  constructor(public usuarioServices: UsuarioService,
              public router: Router) 
              
              { 

                this.forma = new FormGroup({
                  email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
                  password: new FormControl('', [Validators.required, Validators.minLength(8)]),
                  recuerdame: new FormControl(''),
                });

              }

  ngOnInit(): void {}

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
          this.guardarStorage(resp.remember_token, resp.user.id);
          console.log(resp);
    
          if (resp.user.role === 'store')
          {
            this.router.navigate(['account']);
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

}
