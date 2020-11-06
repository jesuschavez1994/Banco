import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUsuarioComponent } from './Logins/login-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTING } from '../app.routes';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../Angula-Material/material.module';
import { ROUTING_VIEW_STORE } from '../vistas-privadas/view.routes';



@NgModule({
  declarations: [LoginUsuarioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    ROUTING_VIEW_STORE,
    ComponentsModule,
    SharedModule
  ],
  exports: [LoginUsuarioComponent]
})
export class LoginModule { }
