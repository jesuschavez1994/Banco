import { NgModule } from '@angular/core';


import { TerminosYCondicionesComponent } from '../views/terminos-ycondiciones/terminos-ycondiciones.component';
import { APP_ROUTING } from '../app.routes';
import { PipesModule } from '../pipes/pipes.module';
import { PublicViewsComponent } from './components/public-views/public-views.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';
import { LoginModule } from '../Login/login.module';
import { VistasPublicasModule } from '../vistas-publicas/vistas-publicas.module';


@NgModule({
    declarations: [
        TerminosYCondicionesComponent,
        PublicViewsComponent,
    ],
    exports: [],
    imports : [
        BrowserModule,
        APP_ROUTING,
        PipesModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ComponentsModule,
        FormularioRegisterModule,
        LoginModule,
        VistasPublicasModule
    ]
})

export class PagesModule { }
