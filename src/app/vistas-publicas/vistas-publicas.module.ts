import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

import { HomeComponent } from '../vistas-publicas/home/home.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '@pipes/pipes.module';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ToastComponent } from '../modals/toast/toast.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { PanelModule } from './panel/panel.module';

import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Angula-Material/material.module';
import { PrivateviewModule } from '../vistas-privadas/privateview.module';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';
import { SliderCategoryComponent } from './home/slider-category/slider-category.component';
import { ModalRecoverPasswordComponent } from './login/container/modal-recover-password/modal-recover-password.component';

/* 
  Components go here.
*/
const components = [
  HomeComponent,
  RegisterComponent,
  BusinessDetailComponent,
  // ToastComponent,
  LoginComponent,
  PageUnderConstructionComponent,
  SliderCategoryComponent,
  ModalRecoverPasswordComponent,
];
/* 
  Modules go here.
*/
const modules = [
  MaterialModule,
  AppRoutingModule,
  FormularioRegisterModule,
  PrivateviewModule,
  ReactiveFormsModule,
  FormsModule,
  SharedModule,
  ComponentsModule,
  PanelModule,
  PipesModule,
  // ShoppingCartModule,
  NgxSpinnerModule,
];
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = [HomeComponent, RegisterComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...exportStuff],
})
export class VistasPublicasModule {}
