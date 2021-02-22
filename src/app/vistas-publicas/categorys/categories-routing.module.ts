import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorysComponent } from './categorys.component';
import { MenuCategorysComponent } from './menu-categorys/menu-categorys.component';
import { ListProductComponent } from './list-product/list-product.component';

const routes: Routes = [
  {
    path: '',
    component: CategorysComponent,

    children: [
      // menu categorys vista predetermianda en categorys
      { path: '', component: MenuCategorysComponent, data: { title: 'Founduss | Categorías' }, },
      // ruta donde se muestra categorys por nombre o id
      { path: ':categories/products', component: ListProductComponent },
      {
        // ruta donde se muestra subcategorys por nombre o id
        path: ':categories/:subcategories/products',
        component: ListProductComponent,
      },
      {
        // ruta donde se muestra subcategorys por nombre o id más
        // posicion de páginacion
        path: ':categories/:subcategories/products?page=:page',
        component: ListProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
