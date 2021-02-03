import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UserStoreService } from '@services/user-store/user-store.service';

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
              public router: Router, public userStoreService: UserStoreService)

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
          if (resp.user.role === 'store'){
            this.userStoreService.getStoreAccountEdit(resp.user.id).subscribe( (StoreResponse: any) => {
              console.log('StoreResponse', StoreResponse);
              this.guardarStorageStore(StoreResponse['0'].social.store_id);
              this.router.navigate(['account/form-account']);
            });
          }

          if (resp.user.role === 'admin'){this.router.navigate(['admin']); }
          if (resp.user.role === 'user'){ 
            this.guardarStorage(resp.remember_token, resp.user.id);
            this.router.navigate(['home']);
           }
        });

  }

  Ingresar() {}

  guardarStorage(token: string, id: string){
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    // localStorage.setItem('storeId', storeId);
    this.token = token;
  }

  guardarStorageStore(storeId: string){
    localStorage.setItem('storeId', storeId);
  }

}
