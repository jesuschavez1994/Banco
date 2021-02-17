import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoadBanckProductComponent } from './pages/load-banck-product/load-banck-product.component'
import { EditProductBankComponent } from './pages/container/edit-product-bank/edit-product-bank.component'

const routes: Routes = [
  {
    path: '',
    component: LoadBanckProductComponent,
    children: [
      {
        path: 'edit-bank-admin/:id',
        component: EditProductBankComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
