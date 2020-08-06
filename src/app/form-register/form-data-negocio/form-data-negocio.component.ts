import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-data-negocio',
  templateUrl: './form-data-negocio.component.html',
  styleUrls: ['./form-data-negocio.component.css']
})
export class FormDataNegocioComponent implements OnInit {

  forma: FormGroup;

  constructor() {

    this.forma = new FormGroup({

          username: new FormControl('', [Validators.required, Validators.minLength(5)]),
          correo: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
          password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
          password2: new FormControl(),
       });

       // tslint:disable-next-line: align
       this.forma.controls['password2'].setValidators([
        Validators.required,
        Validators.minLength(8),
        this.noIgual.bind(this.forma)
      ]);

  }

  // Validación personalizada
  noIgual( control: FormControl): { [s: string]: boolean} {
    const forma: any = this;
    if ( control.value !== forma.controls['password1'].value ) {
       return{
         noiguales: true
       };
     }
    return null;
  }

  ngOnInit(): void {
  }

  registrarNegocio(){

  }

  registrar(){

  }

}
