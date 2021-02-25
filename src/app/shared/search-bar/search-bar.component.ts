import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';
import { SearchBarService } from '@shared/search-bar/services/search-bar.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('selectFilter') selectFilter: ElementRef;

  @Input() preloadedValue = '';
  @Input() isExpanded = false;
  @Input() buttonSidebarList = false;
  @Input() debounce = 3000;
  /*********/
  // POR DEFECTO MUESTRA EL FILTRO
  @Input() showFilter = true;
  /*********/
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string | any>();

  @Input() filterOptions: FilterOption[];

  // Created these variables to implement Angular's reactive forms
  @Output() searchEmitter = new EventEmitter<string>();
  searchForm = new FormControl();
  preloadedSearchValue = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _searchBarService: SearchBarService
  ) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((searchTerm: string) => {
        // this.searchEmitter.emit(searchTerm)
        this.handleSearch(searchTerm);
      });
  }

  ngAfterViewInit() {
    this.textTosearch();
    this.route.paramMap.subscribe((queryParams) =>
      this.preloadSearchValue(queryParams)
    );
  }

  public toggleSidebarList(event) {
    this.isExpanded = event;
    this.sidebarExpand.emit(this.isExpanded);
  }

  public textTosearch() {
    const searchInput = this.searchInput.nativeElement;
    let selectFilter;

    /***** */
    if (this.showFilter) {
      selectFilter = this.selectFilter.nativeElement;
    }
    /******/
    let timeoutSearchInput;

    searchInput.onkeyup = () => {
      timeoutSearchInput = setTimeout(() => {
        this.search.emit({
          value: searchInput.value,
          filter: this.selectFilter.nativeElement,
        });
        /***** */
        if (this.showFilter) {
          this.search.emit({
            value: searchInput.value,
            filter: selectFilter.value,
          });
        }
        /******/
      }, this.debounce);
    };

    searchInput.onkeypress = () => {
      clearTimeout(timeoutSearchInput);
    };

    /***** */
    if (this.showFilter) {
      selectFilter.onchange = () => {
        this.search.emit({
          value: searchInput.value,
          filter: selectFilter.value,
        });
      };
    }
    /******/
  }

  preloadSearchValue(queryParams: ParamMap) {
    this.preloadedSearchValue = queryParams.has('name')
      ? queryParams.get('name')
      : '';

    this.searchForm.setValue(this.preloadedSearchValue);
  }

  handleSearch(searchTerm: string) {
    this._searchBarService.updateSearchInputValue(searchTerm);
    if (searchTerm !== '') {
      this.router.navigate(['search-results'], {
        queryParams: searchTerm !== '' ? { name: searchTerm } : {},
      });
    }
  }
}
