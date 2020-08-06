import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTING } from '../app.routes';
// Importamos los formularios de registros //
import { FormDataUsuarioComponent } from './form-data-usuario/form-data-usuario.component';
import { FormDataNegocioComponent } from './form-data-negocio/form-data-negocio.component';


@NgModule({
  declarations: [FormDataUsuarioComponent, FormDataNegocioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    APP_ROUTING
  ],
  exports: [FormDataUsuarioComponent, FormDataNegocioComponent]
})
export class FormularioRegisterModule { }
