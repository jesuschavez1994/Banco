import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../shared/vistas-privadas-shared.module';

import { ContactComponent } from './pages/contact/contact.component';
import { CardShimmerTableInformacionComponent } from './components/cards-shimmer/card-shimmer-table-informacion/card-shimmer-table-informacion.component';
import { CardShimmerTitleStoreComponent } from './components/cards-shimmer/card-shimmer-title-store/card-shimmer-title-store.component';
import { ContactDescriptionComponent } from './components/contact-description/contact-description.component';
import { ContactDescriptionEditComponent } from './components/contact-description-edit/contact-description-edit.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { ContactInformationEditComponent } from './components/contact-information-edit/contact-information-edit.component';
import { MapEditarComponent } from './components/map-editar/map-editar.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { MyStoreComponent } from './my-store.component';
import { ScheduleStoreComponent } from './components/schedule-store/schedule-store.component';
import { SheduleStoreEditComponent } from './components/shedule-store-edit/shedule-store-edit.component';
/* 
  Components go here.
*/
const components = [
  ContactComponent,
  CardShimmerTableInformacionComponent,
  CardShimmerTitleStoreComponent,
  ContactDescriptionComponent,
  ContactDescriptionEditComponent,
  ContactInformationComponent,
  ContactInformationEditComponent,
  MapEditarComponent,
  MapaComponent,
  MyStoreComponent,
  ScheduleStoreComponent,
  SheduleStoreEditComponent,
];
/* 
  Modules go here.
*/
const modules = [
  NzTimePickerModule,
  MyStoreRoutingModule,
  SharedModule,
  VistasPrivadasSharedModule,
];
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = [];
@NgModule({
  entryComponents: [MapEditarComponent, ContactDescriptionEditComponent],
  declarations: [...components],
  imports: [
    ...modules,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14',
    }),
  ],
  exports: [],
})
export class MyStoreModule {}
