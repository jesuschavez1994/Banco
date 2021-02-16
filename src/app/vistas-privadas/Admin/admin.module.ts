import { NgModule } from '@angular/core'

import { AdminRoutingModule } from './admin-routing.module'
import { SharedModule } from '@shared/shared.module'

import { CatalogoBankProductComponent } from './pages/container/catalogo-bank-product/catalogo-bank-product.component'
import { EditProductBankComponent } from './pages/container/edit-product-bank/edit-product-bank.component'
import { FormBanckProductAdminComponent } from './pages/load-banck-product/container/form-banck-product-admin/form-banck-product-admin.component'
import { LoadBanckProductComponent } from './pages/load-banck-product/load-banck-product.component'

/* 
  Components go here.
*/
const components = [
  CatalogoBankProductComponent,
  EditProductBankComponent,
  FormBanckProductAdminComponent,
  LoadBanckProductComponent,
]
/* 
  Modules go here.
*/
const modules = [AdminRoutingModule, SharedModule]
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = []

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class AdminModule {}
