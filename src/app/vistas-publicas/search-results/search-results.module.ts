import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SearchResultsRoutingModule } from './search-results-routing.module'
import { SharedModule } from '../Module.index'

import { SearchResultsComponent } from './search-results.component'
/* 
  Components go here.
*/
const components = [SearchResultsComponent]
/* 
  Modules go here.
*/
const modules = [SearchResultsRoutingModule, SharedModule]

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class SearchResultsModule {}
