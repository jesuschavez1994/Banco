import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../shared/vistas-privadas-shared.module';

import { ContactComponent } from './pages/contact/contact.component';
import { ContactDescriptionEditComponent } from './components/contact-description-edit/contact-description-edit.component';
import { MapEditarComponent } from './components/map-editar/map-editar.component';
import { MyStoreComponent } from './my-store.component';

import { MyStoreComponentsModule } from './components/my-store-components.module';
/* 
  Components go here.
*/
const components = [
  ContactComponent,
  ContactDescriptionEditComponent,
  MapEditarComponent,
  MyStoreComponent,
];
/* 
  Modules go here.
*/
const modules = [
  NzTimePickerModule,
  MyStoreComponentsModule,
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
