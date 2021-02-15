import { NgModule } from '@angular/core';
/* 
  Modules go here
*/
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
/* 
  Components go here
*/
import { CategorysComponent } from './categorys.component';
import { MenuCategorysComponent } from './menu-categorys/menu-categorys.component';
import { ListProductComponent } from './list-product/list-product.component';

const components = [
  CategorysComponent,
  MenuCategorysComponent,
  ListProductComponent,
];

const modules = [CategoriesRoutingModule, NgxSpinnerModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class CategoriesModule {}
