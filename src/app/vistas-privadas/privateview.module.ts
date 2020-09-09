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
import { MapEditarComponent } from './components/map-editar/map-editar.component';
import { ImageCropperModule } from 'ngx-image-cropper';

// Mapa //
import { AgmCoreModule } from '@agm/core';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

import { ContactDescriptionEditComponent } from './components/contact-description-edit/contact-description-edit.component';
import { ContactDescriptionComponent } from './components/contact-description/contact-description.component';
import { AsideComponent } from './shared/aside/aside.component';

@NgModule({
    entryComponents: [
      MapEditarComponent,
      ContactDescriptionEditComponent
    ],
    // tslint:disable-next-line: max-line-length
    declarations: [DashboardComponent,
      FormAccountComponent,
      ContactComponent,
      ContactInformationEditComponent,
      ContactInformationComponent,
      MapaComponent,
      MapEditarComponent,
      ContactDescriptionEditComponent,
      ContactDescriptionComponent,
      AsideComponent],

    imports: [CommonModule,
      SharedModule,
      ImageCropperModule,
      MatInputModule,
      MatGridListModule,
      MatSnackBarModule,
      MatButtonModule,
      MatDialogModule,
      MatCardModule,
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
