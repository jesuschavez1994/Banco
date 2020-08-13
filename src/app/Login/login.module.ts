import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUsuarioComponent } from './Logins/login-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTING } from '../app.routes';
import { ButtomGoogleSesionComponent } from './buttom-google-sesion/buttom-google-sesion.component';


@NgModule({
  declarations: [LoginUsuarioComponent, ButtomGoogleSesionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  exports: [LoginUsuarioComponent]
})
export class LoginModule { }
