import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../../../shared/vistas-privadas-shared.module';
import { SearchModule } from '../../components/search/search.module';

import { BankProductComponent } from './bank-product.component';
import { ItemListProductComponent } from './container/item-list-product/item-list-product.component';
/* 
  Components go here.
*/
const components = [BankProductComponent, ItemListProductComponent];
/* 
  Modules go here.
*/
const modules = [SearchModule, SharedModule, VistasPrivadasSharedModule];
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = [];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class BankProductModule {}
