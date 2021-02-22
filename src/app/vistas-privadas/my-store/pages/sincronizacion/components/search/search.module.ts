import { NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../../../../../shared/vistas-privadas-shared.module';

import { SearchComponent } from './search.component';
import { SearchStoreComponent } from './container/search-store/search-store.component';
/* 
  Components go here.
*/
const components = [SearchComponent, SearchStoreComponent];
/* 
  Modules go here.
*/
const modules = [NgxSpinnerModule, SharedModule, VistasPrivadasSharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class SearchModule {}
