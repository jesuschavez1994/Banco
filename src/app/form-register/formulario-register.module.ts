import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTING } from '../app.routes';
// Importamos los formularios de registros //
import { FormDataUsuarioComponent } from './form-data-usuario/form-data-usuario.component';
import { FormDataNegocioComponent } from './form-data-negocio/form-data-negocio.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { RutStoreComponent } from './rut-store/rut-store.component';
import { ButtomGoogleRegisterComponent } from './buttom-google-register/buttom-google-register.component';
import { MaterialModule } from '../Angula-Material/material.module';




@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [FormDataUsuarioComponent,
    FormDataNegocioComponent,
    RutStoreComponent,
    ButtomGoogleRegisterComponent, ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    APP_ROUTING,
    ComponentsModule,
    SharedModule
  ],
  exports: [FormDataUsuarioComponent, FormDataNegocioComponent, RutStoreComponent]
})
export class FormularioRegisterModule { }
