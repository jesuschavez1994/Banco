import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormAccountComponent } from './form-account/form-account.component';
import { ContactComponent } from './contact/contact.component';
import { ComponentsModule } from '../components/components.module';
import { APP_ROUTING } from '../app.routes';
import { ContactInformationEditComponent } from './components/contact-information-edit/contact-information-edit.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapaComponent } from './components/mapa/mapa.component';
// Mapa //
import { AgmCoreModule } from '@agm/core';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    // tslint:disable-next-line: max-line-length
    declarations: [DashboardComponent,
      FormAccountComponent,
      ContactComponent,
      ContactInformationEditComponent,
      ContactInformationComponent,
      MapaComponent],

    imports: [CommonModule,
      SharedModule,
      MatButtonModule,
      BrowserAnimationsModule,
      ComponentsModule,
      APP_ROUTING,
      FormsModule,
      ReactiveFormsModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14'
      })
      ],

    exports: []
  })
  export class PrivateviewModule { }
