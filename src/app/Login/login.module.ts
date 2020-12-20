import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUsuarioComponent } from './Logins/login-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../Angula-Material/material.module';
import { ROUTING_VIEW_PRIVATE_STORE } from '../vistas-privadas/private-views.routes';



@NgModule({
  declarations: [LoginUsuarioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ROUTING_VIEW_PRIVATE_STORE,
    ComponentsModule,
    SharedModule
  ],
  exports: [LoginUsuarioComponent]
})
export class LoginModule { }
