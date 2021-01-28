import { Component, OnInit, EventEmitter,  Output, Input } from '@angular/core';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  addProductNew = false;

  // ENTRADAS //
  @Input() isExpanded = false;
  @Input() buttonSidebarList = false;
  @Input() filterOptions: FilterOption[];
  @Input() BuscarText: any ;
  @Input() debounce = 3000;

  // SALIDAS //
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() public searchEmitter = new EventEmitter<string>();

  public search = new FormControl('');

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {this.searchEmitter.emit(value); console.log('search', value); } );
  }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );
    console.log('event search', event);

  }

  public addNewProduct(){
    this.addProductNew = true;
  }

}
