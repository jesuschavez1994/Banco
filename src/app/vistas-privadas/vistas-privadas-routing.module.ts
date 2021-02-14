import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './vistas-privadas.routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class VistasPrivadasRoutingModule {}
