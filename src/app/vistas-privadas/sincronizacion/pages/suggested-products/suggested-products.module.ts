import { NgModule } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '@shared/shared.module';
import { SearchModule } from '../../components/search/search.module';

import { CarouselSuggestedComponent } from './container/carousel-suggested/carousel-suggested.component';
import { ItemsSuggestedProductsComponent } from './container/items-suggested-products/items-suggested-products.component';
import { NoSuggestedProductsComponent } from './container/no-suggested-products/no-suggested-products.component';
import { SuggestedProductsComponent } from './suggested-products.component';

/* 
  Components go here.
*/
const components = [
  CarouselSuggestedComponent,
  ItemsSuggestedProductsComponent,
  NoSuggestedProductsComponent,
  SuggestedProductsComponent,
];
/* 
  Modules go here.
*/
const modules = [SearchModule, NgxSpinnerModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class SuggestedProductsModule {}
