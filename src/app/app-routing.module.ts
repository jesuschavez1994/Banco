import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 
  All the app's routes
*/
import { APP_ROUTES } from './app.routes';
import { VistasPublicasRoutingModule } from './vistas-publicas/vistas-publicas-routing.module';

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: true }),
    VistasPublicasRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
