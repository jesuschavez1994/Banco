import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UsuarioService } from '@services/usuario/usuario.service';
import { Usuario } from '@models/usuario.model';


import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../shared/ui.accions';

@Component({
  selector: 'app-form-data-usuario',
  templateUrl: './form-data-usuario.component.html',
  styleUrls: ['./form-data-usuario.component.css']
})
export class FormDataUsuarioComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  loadding = false;
  cargando: boolean;
  subscription: Subscription;

  controls: any;

 constructor(
   public usuarioServices: UsuarioService,
   public router: Router,
   public store: Store<AppState>
 )
  {

    this.forma = new FormGroup({
      nombre: new FormControl('' , [Validators.required, Validators.minLength(5)]),
      correo: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl(),
      terminos: new FormControl('', Validators.required),

    });
    this.forma.controls['password2'].setValidators([
      Validators.required,
      Validators.minLength(8),
      this.noIgual.bind(this.forma)
    ]);

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.store.select('ui').subscribe( ui => {
     this.cargando =  ui.isLoading;
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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

  existeUsuario( control: FormControl): Promise<any>|Observable<any>{
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout ( () => {
          if ( control.value === 'jesus'){
            resolve({ existe: true});
            console.log('existe usuario');
          }else{
            resolve(null);
          }
        } , 3000);
      }
    );

    return promesa;
  }


  registrarUsuario(){

    this.store.dispatch( new ActivarLoadingAction() );

    console.log(this.forma.value);
    console.log(this.forma);

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.username,
      this.forma.value.password1
    );

    this.usuarioServices.crearUsuario(usuario).subscribe( res => {
      console.log('usuario', res);
      this.router.navigate(['/login-usuario']);
      this.store.dispatch( new DesactivarLoadingAction() );
    });
  }

  usuarioCreado(){
    this.loadding = true;
    setTimeout(() => this.loadding = false, 3000);
  }


}
