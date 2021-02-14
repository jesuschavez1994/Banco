import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 
  Components used in the routes.
*/
import { HomeComponent } from './home/home.component';
import { CategorysComponent } from './categorys/categorys.component';
import { MenuCategorysComponent } from './categorys/menu-categorys/menu-categorys.component';
import { ListProductComponent } from './categorys/list-product/list-product.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { LoginComponent } from './login/login/login.component';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'categories',
    component: CategorysComponent,

    children: [
      // menu categorys vista predetermianda en categorys
      { path: '', component: MenuCategorysComponent },
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
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Founduss | Iniciar sesión' },
  },
  {
    path: 'business-detail/:idStore', // Se obtiene el id de la tienda para mostrar su listo productos
    component: BusinessDetailComponent,
  },
  {
    path: 'business-detail/:idStore/:show', // Se obtiene el id de la tienda para mostrar su listo productos
    component: BusinessDetailComponent,
  },
  {
    path: 'business-detail/:idStore/:show/:idProduct', // Se obtiene el id de la tienda para mostrar su listo productos
    component: BusinessDetailComponent,
  },
  {
    path: 'page-under-construction',
    component: PageUnderConstructionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistasPublicasRoutingModule {}
