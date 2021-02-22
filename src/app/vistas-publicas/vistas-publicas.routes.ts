import { Routes } from '@angular/router'
/* 
  Components used in the routes.
*/
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './Registers/Usuario/register.component'
import { LoginComponent } from './login/login/login.component'
import { PageUnderConstructionComponent } from './page-under-construction/page-under-construction.component'
import { BusinessDetailComponent } from './business-detail/business-detail.component'
import { VerifyTokenGuard } from '@services/guards/verify-token.guard'

export const ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule),
    canActivate: [VerifyTokenGuard],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'categories',
    canActivate: [VerifyTokenGuard],
    loadChildren: () =>
      import('./categorys/categories.module').then(
        (module) => module.CategoriesModule
      ),
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Iniciar sesión | Founduss' },
  },
  {
    path: 'business-detail/:idStore', // Se obtiene el id de la tienda para mostrar su listo productos
    component: BusinessDetailComponent,
    canActivate: [VerifyTokenGuard],
  },
  {
    path: 'business-detail/:idStore/:show', // Se obtiene el id de la tienda para mostrar su listo productos
    component: BusinessDetailComponent,
    canActivate: [VerifyTokenGuard],
  },
  {
    path: 'business-detail/:idStore/:show/:idProduct', // Se obtiene el id de la tienda para mostrar su listo productos
    component: BusinessDetailComponent,
    canActivate: [VerifyTokenGuard],
  },
  {
    path: 'page-under-construction',
    component: PageUnderConstructionComponent,
    canActivate: [VerifyTokenGuard],
  },
]
