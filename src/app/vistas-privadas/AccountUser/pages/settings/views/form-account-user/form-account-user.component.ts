import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';

import { UserStoreService } from '@services/user-store/user-store.service';
import { DataUsuarioAccount } from '@interfaces/usuario/usuario';

@Component({
  selector: 'app-form-account-user',
  templateUrl: './form-account-user.component.html',
  styleUrls: ['./form-account-user.component.scss']
})

export class FormAccountUserComponent implements OnInit {

  datosUsuario: DataUsuarioAccount;
  forma: FormGroup;

  constructor(private userStoreServices: UserStoreService) {

    this.forma = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      password1: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

  }

  ngOnInit(): void {
    this.DataUserForm();
  }

  DataUserForm(){
    this.userStoreServices.getStore().subscribe((resp: DataUsuarioAccount) => {
      console.log('xx', resp);
      this.datosUsuario = resp;
      // SET DEL FORMULARIO //
      this.forma.get('username').setValue(this.datosUsuario.username);
      this.forma.get('name').setValue(this.datosUsuario.name);
      this.forma.get('email').setValue(this.datosUsuario.email);
      this.forma.get('phone').setValue(this.datosUsuario.phone);
    });
  } 

}
