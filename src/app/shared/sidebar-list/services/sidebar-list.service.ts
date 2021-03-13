import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ParamMap } from '@angular/router';
import {
  AnchorsMenu,
  SidebarSections,
  Filter,
} from '@interfaces/components-options/sidebar-list.options.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarListService {
  //  Observable data sources
  private anchorsMenuDataSource = new Subject<AnchorsMenu[]>();
  private sectionsToShowDataSource = new Subject<SidebarSections>();
  private filterValuesDataSource = new Subject<Filter[]>();
  private checkedOptionsDataSource = new Subject<ParamMap>();

  // Observable data streams
  anchorsMenuData$ = this.anchorsMenuDataSource.asObservable();
  sectionsToShow$ = this.sectionsToShowDataSource.asObservable();
  filterValues$ = this.filterValuesDataSource.asObservable();
  checkedOptions$ = this.checkedOptionsDataSource.asObservable();

  // Service methods
  setRequiredSections(sections: SidebarSections) {
    this.sectionsToShowDataSource.next(sections);
  }

  setAnchors(anchors: AnchorsMenu[]) {
    this.anchorsMenuDataSource.next(anchors);
  }

  setFilters(filters: Filter[]) {
    this.filterValuesDataSource.next(filters);
  }

  loadFilterOptions(queryParams: ParamMap) {
    this.checkedOptionsDataSource.next(queryParams);
  }
}
