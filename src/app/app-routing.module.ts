import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 
  All the app's routes
*/
import { APP_ROUTES } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
