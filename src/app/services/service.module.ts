import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { 
  UsuarioService,
  LoginGuardGuard,
  StoreService,
  UserStoreService,
  InterceptorService,
  ProductLoadingComponent,
  ProductService,
  SincronizacionService,
  VerifyTokenGuard
} from './service.index';

/* 
  Services go here.
*/
const services = [
  UsuarioService,
  StoreService,
  LoginGuardGuard,
  UserStoreService,
  InterceptorService,
  ProductLoadingComponent,
  SincronizacionService,
  ProductService,
  VerifyTokenGuard,
];

@NgModule({
  declarations: [],
  providers: [
    ...services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  imports: [CommonModule],
  exports: [],

})

export class ServiceModule { }
