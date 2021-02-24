import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { AnchorsMenu } from '@interfaces/components-options/sidebar-list.options.interface'

@Injectable({
  providedIn: 'root',
})
export class SidebarListService {
  //  Observable data sources
  private anchorsMenuDataSource = new Subject<AnchorsMenu[]>()

  // Observable data streams
  anchorsMenuData$ = this.anchorsMenuDataSource.asObservable()

  // Service methods
  setAnchors(anchors: AnchorsMenu[]) {
    this.anchorsMenuDataSource.next(anchors)
  }
}
