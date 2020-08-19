import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RegistroEmpresa } from '../../models/rut.model';
import { StoreService } from '../../services/store/store.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-rut-store-google',
  templateUrl: './rut-store-google.component.html',
  styleUrls: ['./rut-store-google.component.css']
})
export class RutStoreGoogleComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public router: Router,
    public storageService: StoreService,
    private store: Store<AppState>
  ) {

    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      rut: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });

  }

  ngOnInit(): void {
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

}
