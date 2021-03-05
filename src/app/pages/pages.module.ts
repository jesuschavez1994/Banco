import { NgModule } from '@angular/core';

import { TerminosYCondicionesComponent } from '../views/public/terminos-ycondiciones/terminos-ycondiciones.component';
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { PublicViewsComponent } from './components/public-views/public-views.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';
import { VistasPublicasModule } from '../vistas-publicas/vistas-publicas.module';

@NgModule({
  declarations: [TerminosYCondicionesComponent, PublicViewsComponent],
  exports: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    FormularioRegisterModule,
    VistasPublicasModule,
  ],
})
export class PagesModule {}
