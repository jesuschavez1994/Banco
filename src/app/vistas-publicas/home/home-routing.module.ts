import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Inicio | Founduss' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
