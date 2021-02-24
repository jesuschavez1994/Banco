import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import {
  AnchorsMenu,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface'

@Injectable({
  providedIn: 'root',
})
export class SidebarListService {
  //  Observable data sources
  private anchorsMenuDataSource = new Subject<AnchorsMenu[]>()
  private sectionsToShowDataSource = new Subject<SidebarSections>()

  // Observable data streams
  anchorsMenuData$ = this.anchorsMenuDataSource.asObservable()
  sectionsToShow$ = this.sectionsToShowDataSource.asObservable()

  // Service methods
  setRequiredSections(sections: SidebarSections) {
    this.sectionsToShowDataSource.next(sections)
  }

  setAnchors(anchors: AnchorsMenu[]) {
    this.anchorsMenuDataSource.next(anchors)
  }
}
