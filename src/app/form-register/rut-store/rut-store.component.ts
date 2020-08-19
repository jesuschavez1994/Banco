import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RegistroEmpresa } from '../../models/rut.model';
import { StoreService } from '../../services/store/store.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Negocio } from '../../models/negocio.model';



@Component({
  selector: 'app-rut-store',
  templateUrl: './rut-store.component.html',
  styleUrls: ['../form-data-usuario/form-data-usuario.component.css']
})
export class RutStoreComponent implements OnInit {

  forma: FormGroup;
  Params: any;
  user: Negocio;
  token: string;

  constructor(

    public router: Router,
    public storageService: StoreService,
    private store: Store<AppState>

    ) {

    this.cargarStorage();

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rut: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });

  }

  registrarRut(){

    const rut  = new RegistroEmpresa(
      this.forma.value.name,
      this.forma.value.rut,
      localStorage.getItem('id')
    );

    console.log(rut);

    this.storageService.registroRut(rut);

  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse( localStorage.getItem('usuario') );

    } else {
      this.token = '';
      this.user = null;

    }

  }



  ngOnInit(): void {
  }

}
