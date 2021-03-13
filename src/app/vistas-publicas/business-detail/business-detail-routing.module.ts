import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { BusinessContactComponent } from '@app/views/public/business-contact/business-contact.component';
import { BusinessProductsComponent } from './views/business-products/business-products.component';

import { BusinessDetailComponent } from './business-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: BusinessProductsComponent },
  { path: 'products/:idProduct', component: BusinessProductsComponent },
  // { path: 'contacto', component: BusinessContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessDetailRoutingModule {}
