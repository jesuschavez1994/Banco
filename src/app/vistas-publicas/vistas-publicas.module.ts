import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../vistas-publicas/home/home.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormularioRegisterModule
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
  ]
})
export class VistasPublicasModule { }
