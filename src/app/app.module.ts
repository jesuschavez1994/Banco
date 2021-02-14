import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Servicios //
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Rutas //
// import { APP_ROUTING } from './app.routes';

// Modulos Personalizados//
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';

import { ServiceModule } from './services/service.module';
import { FormularioRegisterModule } from './form-register/formulario-register.module';
import { VistasPublicasModule } from './vistas-publicas/vistas-publicas.module';
// ngrx => PATRÓN REDUX//
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { InterceptorService } from './services/Interceotores/interceptor.service';
import { PrivateviewModule } from './vistas-privadas/privateview.module';
// Angular material //
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ca_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ca from '@angular/common/locales/ca';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SuccessComponent } from './modals/success/success.component';
import { ToastComponent } from './modals/toast/toast.component';
import { ConfirmWebpayPlusComponent } from './modals/confirm-webpay-plus/confirm-webpay-plus.component';

// Check Module connection to internet //
import {
  ConnectionServiceModule,
  ConnectionServiceOptions,
  ConnectionServiceOptionsToken,
} from 'ngx-connection-service';
// HAmmerjs //

// particular imports for hammer
import * as Hammer from 'hammerjs';
import {
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';

registerLocaleData(ca);

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  } as any;
}

@NgModule({
  declarations: [AppComponent, SuccessComponent, ConfirmWebpayPlusComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ImageCropperModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PipesModule,
    ConnectionServiceModule,
    // APP_ROUTING,
    RouterModule,
    PagesModule,
    SharedModule,
    ServiceModule,
    FormularioRegisterModule,
    VistasPublicasModule,
    PrivateviewModule,
    ReactiveFormsModule,
    FormsModule,
    HammerModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14',
    }),
    NgbModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],

  providers: [
    Title,
    { provide: NZ_I18N, useValue: ca_ES },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
      provide: ConnectionServiceOptionsToken,
      useValue: {
        enableHeartbeat: false,
        heartbeatUrl: '/assets/ping.json',
        requestMethod: 'get',
        heartbeatInterval: 3000,
      } as ConnectionServiceOptions,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
