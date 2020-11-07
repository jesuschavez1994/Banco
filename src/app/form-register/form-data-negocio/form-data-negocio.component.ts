import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { StoreService } from '@services/store/store.service';
import { Usuario } from '@models/usuario.model';
import { MyValidators } from '@utils/validators';


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
      username: new FormControl('', [Validators.required, Validators.minLength(5)], MyValidators.validateUserName(this.storeServices)),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      // tslint:disable-next-line: max-line-length
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')], MyValidators.validateUserEmail(this.storeServices)),
      password1: new FormControl('', [Validators.required, Validators.minLength(8), MyValidators.validPassword]),
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

    const user = new Usuario(
      this.forma.value.username,
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password1
    );

    this.storeServices.crearStore(user);


    console.log(this.forma);
  }

  registrar(){}



}
