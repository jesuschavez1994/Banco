import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../../shared/vistas-privadas-shared.module';

import { CardShimmerTableInformacionComponent } from './cards-shimmer/card-shimmer-table-informacion/card-shimmer-table-informacion.component';
import { CardShimmerTitleStoreComponent } from './cards-shimmer/card-shimmer-title-store/card-shimmer-title-store.component';
import { ContactDescriptionComponent } from './contact-description/contact-description.component';
import { ContactDescriptionEditComponent } from './contact-description-edit/contact-description-edit.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import { ContactInformationEditComponent } from './contact-information-edit/contact-information-edit.component';
import { MapEditarComponent } from './map-editar/map-editar.component';
import { MapaComponent } from './mapa/mapa.component';
import { ScheduleStoreComponent } from './schedule-store/schedule-store.component';
import { SheduleStoreEditComponent } from './shedule-store-edit/shedule-store-edit.component';
/* 
  Components go here.
*/
const components = [
  CardShimmerTableInformacionComponent,
  CardShimmerTitleStoreComponent,
  ContactDescriptionComponent,
  ContactDescriptionEditComponent,
  ContactInformationComponent,
  ContactInformationEditComponent,
  MapEditarComponent,
  MapaComponent,
  ScheduleStoreComponent,
  SheduleStoreEditComponent,
];
/* 
  Modules go here.
*/
const modules = [NzTimePickerModule, SharedModule, VistasPrivadasSharedModule];

@NgModule({
  entryComponents: [MapEditarComponent, ContactDescriptionEditComponent],
  declarations: [...components],
  imports: [
    ...modules,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14',
    }),
  ],
  exports: [...components],
})
export class MyStoreComponentsModule {}
