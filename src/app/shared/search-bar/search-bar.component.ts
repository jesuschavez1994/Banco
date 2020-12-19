import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('selectFilter') selectFilter: ElementRef;

  @Input() isExpanded = false;
  @Input() buttonSidebarList = false;
  @Input() debounce = 3000;
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string | any>();

  @Input() filterOptions: FilterOption[];

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {
   this.textTosearch();

  }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );

  }

  public textTosearch() {
    const searchInput = this.searchInput.nativeElement;
    const selectFilter = this.selectFilter.nativeElement;
    let timeoutSearchInput;

    searchInput.onkeyup = () => {

      timeoutSearchInput = setTimeout( () =>

        {

          this.search.emit({
            value: searchInput.value,
            filter: selectFilter.value
          });

        }, this.debounce

      );

    };

    searchInput.onkeypress = () => {
      clearTimeout(timeoutSearchInput);
    };

    selectFilter.onchange = () => {
      this.search.emit({
        value: searchInput.value,
        filter: selectFilter.value
      });
    };

  }

}


