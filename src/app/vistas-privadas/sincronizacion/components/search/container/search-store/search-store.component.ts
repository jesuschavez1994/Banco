import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';
import { AsideFiltrosComponent } from '../../../../../shared/aside-filtros/aside-filtros.component';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-search-store',
  templateUrl: './search-store.component.html',
  styleUrls: ['./search-store.component.scss']
})
export class SearchStoreComponent implements OnInit {

  addProductNew = false;
  expandSidebar = false;

  // ENTRADAS //
  @Input() isExpanded = false;
  @Input() buttonSidebarList = false;
  @Input() filterOptions: FilterOption[];
  @Input() BuscarText: any ;
  @Input() debounce = 3000;

  // SALIDAS //
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() public searchEmitter = new EventEmitter<string>();

  BotonActivated: string;
  addBotonEvent: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute )
              {
                router.events.filter(event => event instanceof NavigationEnd)
                  .subscribe(event => {
                  console.log('BotonActivated', event['url']);
                  this.BotonActivated = this.router.routerState.snapshot.url;
                });
              }

  public search = new FormControl('');

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );
    console.log('event search', event);

  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {this.searchEmitter.emit(value); console.log('search', value); } );
  }

  public addNewProduct(){
    this.addProductNew = true;
  }

}
