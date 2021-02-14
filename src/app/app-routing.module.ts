import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 
  All the app's routes
*/
import { APP_ROUTES } from './app.routes';
import { VistasPublicasRoutingModule } from './vistas-publicas/vistas-publicas-routing.module';
import { VistasPrivadasRoutingModule } from './vistas-privadas/vistas-privadas-routing.module';

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: true }),
    VistasPublicasRoutingModule,
    VistasPrivadasRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
