import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario/usuario.service';
import { ServicioService } from './servicio.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { StoreService } from './store/store.service';
import { UserStoreService } from './user-store/user-store.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './Interceotores/interceptor.service';
import { ProductLoadingComponent } from '../vistas-privadas/product-loading/product-loading.component';
import { SincronizacionService } from './sincronizacion/sincronizacion.service';


@NgModule({
  declarations: [],
  providers: [
    UsuarioService,
    StoreService,
    ServicioService,
    LoginGuardGuard,
    UserStoreService,
    InterceptorService,
    ProductLoadingComponent,
    SincronizacionService,
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
