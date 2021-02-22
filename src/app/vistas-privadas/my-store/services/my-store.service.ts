import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MyStoreService {
  // Observable sources
  private sidebarExpandedSource = new Subject<boolean>()

  // Observable streams
  sidebarExpanded$ = this.sidebarExpandedSource.asObservable()

  // Store service commands
  /**
   * Tells the sidebar to update it's state according to the argument.
   *
   * @param {boolean} state
   */
  expandSidebar(state: boolean) {
    this.sidebarExpandedSource.next(state)
  }
}
