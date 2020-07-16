import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-data-usuario',
  templateUrl: './form-data-usuario.component.html',
  styleUrls: ['./form-data-usuario.component.css']
})
export class FormDataUsuarioComponent {

  forma: FormGroup;
  loadding: boolean = false;

  // usuario: any = {

  //    nombrecompleto: {
  //    nombre: 'fernando',
  //    apellido: 'herrera'
  //   },

  //   correo: 'fernando.herrera85@gmail.com',
  //   // pasatiempos: ['Correr', 'Caminar', 'Dormir']
  // };
  controls: any;

 constructor() {

  //  console.log(this.usuario);

   this.forma = new FormGroup({

       nombrecompleto: new FormGroup({

         nombre: new FormControl('' , [Validators.required, Validators.minLength(5)]),

         apellido: new FormControl('' , [Validators.required, Validators.minLength(5)])}),

         correo: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

         username: new FormControl('', Validators.required, this.existeUsuario),
         password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
         password2: new FormControl(),
         terminos: new FormControl('', Validators.required),

       });

       // tslint:disable-next-line: align
       // tslint:disable-next-line: no-string-literal
   this.forma.controls['password2'].setValidators([
         Validators.required,
         Validators.minLength(8),
         this.noIgual.bind(this.forma)
       ]);

  }

  // Validación personalizada
  noIgual( control: FormControl): { [s: string]: boolean} {
    const forma: any = this;
    // tslint:disable-next-line: no-string-literal
     // tslint:disable-next-line: align
     // tslint:disable-next-line: no-string-literal
    if ( control.value !== forma.controls['password1'].value ) {
       return{
         noiguales: true
       };
     }
    return null;
  }

  existeUsuario( control: FormControl): Promise<any>|Observable<any>{
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout ( () => {
          if ( control.value === 'jesus'){
            resolve({ existe: true});
          }else{
            resolve(null);
          }
        } , 3000);
      }
    );

    return promesa;
  }

   agregarPasatiempos(){
     // tslint:disable-next-line: no-unused-expression
       // tslint:disable-next-line: no-string-literal
       (this.forma.controls['pasatiempos'] as FormArray).push(
         new FormControl('Dormir', Validators.required)
       );

  }

  guardarCambios(){
   console.log(this.forma.value);
   console.log(this.forma);

  }

  usuarioCreado(){
    this.loadding = true;
    setTimeout(() => this.loadding = false, 3000);
  }

}
