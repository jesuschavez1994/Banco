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

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rut: new FormControl('', [Validators.required, Validators.maxLength(9)]),
    });

  }

  registrarRut(){

    const RazonSocialYRut  = new RegistroEmpresa(
      this.forma.value.name,
      this.forma.value.rut,
      localStorage.getItem('id')
    );

    this.storageService.registroRut(RazonSocialYRut);

  }


  ngOnInit(): void {
  }

}
