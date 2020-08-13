import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../vistas-publicas/home/home.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';
import { SharedModule } from '../shared/shared.module';
import { APP_ROUTING } from '../app.routes';
import { LoginModule } from '../Login/login.module';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormularioRegisterModule,
    SharedModule,
    APP_ROUTING,
    LoginModule
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
  ]
})
export class VistasPublicasModule { }
