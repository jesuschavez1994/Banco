import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, } from '@angular/forms';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';
import { Negocio } from '../../models/negocio.model';
import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  forma: FormGroup;
  items: any = {};
  userStore: Negocio;
  usuario: Usuario;
  token: string;
  datosUsuario: any[] = [];
  // tslint:disable-next-line: member-ordering

  constructor(
    public userStoreServices: UserStoreService,
    public storeService: StoreService,
    public usuarioService: UsuarioService
  ) {

    // this.usuario = this.toObject.user;
    console.log(this.usuario);

    this.forma = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

  }

  ngOnInit() {
    this.userStoreServices.getStore().subscribe(resp => {
      this.datosUsuario.push(resp);
    });
  }


  ActualizarDatosUser(user: Usuario){

    const Userstore = new Usuario(
      this.forma.value.username,
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.phone,
    );

    this.userStoreServices.ActualizarUsuarioNegocio(localStorage.getItem('id'), Userstore).subscribe( usuarioActualizado => {
      console.log('Data', usuarioActualizado);
      const usuarioDB: any = usuarioActualizado;
      this.guardarStorage(usuarioDB.id, localStorage.getItem('token'));
      // this.guardarStorage(data.id, )
    });

  }

  guardarStorage(id: string, token: string){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    this.token = token;
  }

  Reset(){
    this.forma.reset(this.usuario);
  }


}


