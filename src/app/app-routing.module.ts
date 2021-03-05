import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
/*
  All the app's routes
*/
import { APP_ROUTES } from './app.routes'
import { VistasPublicasRoutingModule } from './vistas-publicas/vistas-publicas-routing.module'
import { VistasPrivadasRoutingModule } from './vistas-privadas/vistas-privadas-routing.module'

// Lo tuve a que agregar otra vez para utilizar el angular schematics
const routes = [
  ...APP_ROUTES,
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    VistasPublicasRoutingModule,
    VistasPrivadasRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
