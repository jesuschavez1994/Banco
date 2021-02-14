import { Routes } from '@angular/router';
/* 
  Components used in the routes.
*/
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Registers/Usuario/register.component';
import { LoginComponent } from './login/login/login.component';
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categorys/categories.module').then(
        (module) => module.CategoriesModule
      ),
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
