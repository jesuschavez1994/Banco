import { NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '@shared/shared.module';

import { AsideComponent } from './aside/aside.component';
import { AsideFiltrosComponent } from './aside-filtros/aside-filtros.component';
import { BannerEditModule } from './banner-edit/banner-edit.module';
import { NavbarSincronizacionComponent } from './navbar-sincronizacion/navbar-sincronizacion.component';
import { ProductsCardsStoreComponent } from './products-cards-store/products-cards-store/products-cards-store.component';

/* 
  Components go here.
*/
const components = [
  AsideComponent,
  AsideFiltrosComponent,
  NavbarSincronizacionComponent,
  ProductsCardsStoreComponent,
];
/* 
  Modules go here.
*/
const modules = [BannerEditModule, NgxSpinnerModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class VistasPrivadasSharedModule {}
