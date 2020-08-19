import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Negocio } from '../../models/negocio.model';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-form-data-negocio',
  templateUrl: './form-data-negocio.component.html',
  styleUrls: ['../form-data-usuario/form-data-usuario.component.css']
})
export class FormDataNegocioComponent implements OnInit {

  forma: FormGroup;
  respServidor: any ;
  @Input() text: any;

  constructor(
    public storeServices: StoreService,
  ) {

    this.forma = new FormGroup({

          name: new FormControl('', [Validators.required, Validators.minLength(5)]),
          correo: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
          password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
          password2: new FormControl(),
          terminos: new FormControl('', Validators.required),
    });

    // tslint:disable-next-line: align
    this.forma.controls.password2.setValidators([
      Validators.required,
      Validators.minLength(8),
      this.noIgual.bind(this.forma)
    ]);

  }

  // Validación personalizada
  noIgual( control: FormControl): { [s: string]: boolean} {
    const forma: any = this;
    if ( control.value !== forma.controls.password1.value ) {
       return{
         noiguales: true
       };
     }
    return null;
  }

  ngOnInit(): void {
  }

  registrarNegocio(){

    const negocio = new Negocio(
      this.forma.value.name,
      this.forma.value.correo,
      this.forma.value.password1
    );

    this.storeServices.crearStore(negocio);
  }

  registrar(){}



}
