import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../vistas-publicas/home/home.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';
import { SharedModule } from '../shared/shared.module';
import { LoginModule } from '../Login/login.module';
import { ComponentsModule } from '../components/components.module';
import {PipesModule } from '@pipes/pipes.module';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ToastComponent } from '../modals/toast/toast.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { RouterModule } from '@angular/router';
import { PanelModule } from './panel/panel.module';

import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Angula-Material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { PrivateviewModule } from '../vistas-privadas/privateview.module';
import { APP_ROUTING } from '../app.routes';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';
import { SliderCategoryComponent } from './home/slider-category/slider-category.component';
import { CategorysComponent } from './categorys/categorys.component';
import { MenuCategorysComponent } from './categorys/menu-categorys/menu-categorys.component';
import { ListProductComponent } from './categorys/list-product/list-product.component';


@NgModule({
  declarations: [

    HomeComponent,
    RegisterComponent,
    BusinessDetailComponent,
    // ToastComponent,

    LoginComponent,
    PageUnderConstructionComponent,
    SliderCategoryComponent,
    CategorysComponent,
    MenuCategorysComponent,
    ListProductComponent,
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
    PanelModule,
    PipesModule,
    // ShoppingCartModule,
    NgxSpinnerModule,
  ],
  exports: [
    HomeComponent,
    RegisterComponent,
  ]
})
export class VistasPublicasModule { }
