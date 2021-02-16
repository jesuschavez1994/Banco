import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
/* 
  Services
*/
import { LoginGuardGuard } from '@services/guards/login-guard.guard'
import { VerifyTokenGuard } from '@services/guards/verify-token.guard'
/* 
  Components used in the views.
*/
import { MyStoreComponent } from './my-store.component'

const routes: Routes = [
  // VISTAS ADMINISTRATIVAS DEL STORE //
  {
    path: '',
    component: MyStoreComponent,
    loadChildren: () =>
      import('./child-routes.module').then(
        (module) => module.ChildRoutesModule
      ),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreRoutingModule {}
