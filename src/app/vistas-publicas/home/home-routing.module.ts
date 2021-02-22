import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Inicio | Founduss' },
  },
  {
    path: 'search-results',
    loadChildren: () =>
      import('../search-results/search-results.module').then(
        (module) => module.SearchResultsModule
      ),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
