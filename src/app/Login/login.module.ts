import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUsuarioComponent } from './Logins/login-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTING } from '../app.routes';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [LoginUsuarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    ComponentsModule,
    SharedModule
  ],
  exports: [LoginUsuarioComponent]
})
export class LoginModule { }
