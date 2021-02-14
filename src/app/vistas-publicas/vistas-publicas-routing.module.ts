import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './vistas-publicas.routes';

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class VistasPublicasRoutingModule {}
