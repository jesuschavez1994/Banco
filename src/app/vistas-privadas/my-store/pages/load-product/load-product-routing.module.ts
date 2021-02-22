import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadProductComponent } from './load-product.component'


const routes: Routes = [
  {
    path: '',
    component: LoadProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadProductRoutingModule { }
