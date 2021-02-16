import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Modules is here */
import {
  MaterialModule,
  FormularioRegisterModule,
  PrivateviewModule,
  SharedModule,
  ComponentsModule,
  PanelModule,
  PipesModule,
  // ShoppingCartModule,
  NgxSpinnerModule,
} from './Module.index';

/* Components is here */

import {
  HomeComponent,
  RegisterComponent,
  BusinessDetailComponent,
  // ToastComponent,
  LoginComponent,
  PageUnderConstructionComponent,
  SliderCategoryComponent,
  ModalRecoverPasswordComponent,
} from './vista-publicas.index'

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
