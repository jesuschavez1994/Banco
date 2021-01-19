import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../vistas-publicas/home/home.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { FormularioRegisterModule } from '../form-register/formulario-register.module';
import { SharedModule } from '../shared/shared.module';
import { APP_ROUTING } from '../app.routes';
import { LoginModule } from '../Login/login.module';
import { ComponentsModule } from '../components/components.module';
// import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ToastComponent } from '../modals/toast/toast.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { RouterModule } from '@angular/router';
import { PanelModule } from './panel/panel.module';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    BusinessDetailComponent,
    ToastComponent,

  ],
  imports: [
    CommonModule,
    FormularioRegisterModule,
    SharedModule,
    APP_ROUTING,
    RouterModule,
    LoginModule,
    ComponentsModule,
    PanelModule,
  ],
  exports: [
    HomeComponent,
    RegisterComponent
  ]
})
export class VistasPublicasModule { }
