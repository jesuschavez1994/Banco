import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../vistas-publicas/home/home.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';
import { SharedModule } from '../shared/shared.module';
import { LoginModule } from '../Login/login.module';
import { ComponentsModule } from '../components/components.module';

// import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Angula-Material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { PrivateviewModule } from '../vistas-privadas/privateview.module';
import { APP_ROUTING } from '../app.routes';
import { SliderCategoryComponent } from './home/slider-category/slider-category.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    // ShoppingCartComponent,
    BusinessDetailComponent,
    LoginComponent,
    SliderCategoryComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FormularioRegisterModule,
    PrivateviewModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    APP_ROUTING,
    RouterModule,
    LoginModule,
    ComponentsModule,
    ShoppingCartModule
  ],
  exports: [
    HomeComponent,
    RegisterComponent
  ]
})
export class VistasPublicasModule { }
