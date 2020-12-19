import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  @Input() isExpanded = false;
  @Input() buttonSidebarList = false;
  @Input() debounce = 5000;
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
   this.textTosearch();

  }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );

  }

  public textTosearch() {
    const searchInput = this.searchInput.nativeElement;
    let timeoutSearchInput;

    searchInput.onkeyup = () => {

      timeoutSearchInput = setTimeout( () =>

        {
          this.search.emit(searchInput.value);

        }, this.debounce

      );

    };

    searchInput.onkeypress = () => {
      clearTimeout(timeoutSearchInput);
    };

  }

}
