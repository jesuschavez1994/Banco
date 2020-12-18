import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, HostListener, AfterViewInit
} from '@angular/core';
import {
  Category, Subcategory, Profile, SidebarListOptions, AnchorsMenu,
  SelectedEmitter
} from '@interfaces/components-options/sidebar-list.options.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit, AfterViewInit {

  // Elements
  @ViewChild('sidebarList') sidebarList: ElementRef;
  @ViewChild('productsOptionMenu') productsOptionMenu: ElementRef;
  @ViewChild('contactoOptionMenu') contactoOptionMenu: ElementRef;

  // Inputs
  @Input() isExpanded = false;
  @Input() sidebarTarget: SidebarListComponent;
  @Input() anchorsMenu: AnchorsMenu;
  @Input() sidebarOptions: SidebarListOptions;

  // Outputs
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<SelectedEmitter>();

  @Input() profile: Profile;
  @Input() categories: Category[] = [];

  currentCategory: Category;
  isSelectedCategory = false;

  currentSubcategories: Subcategory[] = [];

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    if (this.sidebarOptions){
      this.anchorsMenu = this.sidebarOptions.anchorsMenu;
      this.profile = this.sidebarOptions.profile;
      this.categories = this.sidebarOptions.categories;
    }
    this.currentCategory = this.categories[0];

  }

  ngAfterViewInit(): void {
    this.routerLinkActive();

  }

  @HostListener('window:scroll', ['$event'])
  public fixedSidebar( $event: Event){

    const sidebarList = this.sidebarList.nativeElement;
    const pxTopElement = sidebarList.offsetTop;
    const pxTopDocument = document.documentElement.scrollTop;

    if ( pxTopDocument > pxTopElement ) {
      sidebarList.classList.add( 'aside--fixed' );
    } else {
      sidebarList.classList.remove( 'aside--fixed' );
    }

  }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );

  }

  public routerLinkActive(){

    this.productsOptionMenu.nativeElement.classList.remove('active');
    this.contactoOptionMenu.nativeElement.classList.remove('active');

    this.route.paramMap.subscribe( params => {

      if ( (params.has('show') && params.get('show') === this.anchorsMenu.wordToMatch) ) {
        this.productsOptionMenu.nativeElement.classList.add('active');

      }else{
        this.contactoOptionMenu.nativeElement.classList.add('active');

      }

    });

  }

  public selectCategory(category: Category) {

    if (category === this.currentCategory) {
      this.isSelectedCategory = this.isSelectedCategory ? false : true;

    }else {
      this.isSelectedCategory = true;
    }

    this.currentCategory = category;
    this.currentSubcategories = [];

    this.selected.emit({
      currentCategory: this.currentCategory,
      isSelectedCategory: this.isSelectedCategory
    });
  }

  public selectSubCategories(subcategory: Subcategory) {

    const inxSubcategory = this.currentSubcategories.findIndex(
      (item) => item === subcategory
    );

    if ( inxSubcategory !== -1 ) {
      this.currentSubcategories.splice(inxSubcategory, 1);

    }else {
      this.currentSubcategories.push(subcategory);

    }

    if (this.currentSubcategories.length > 0 && this.isSelectedCategory === false){
      this.isSelectedCategory = true;
    }

    this.selected.emit({
      currentCategory: this.currentCategory,
      isSelectedCategory: this.isSelectedCategory,
      SelectedSubCategories: this.currentSubcategories
    });

  }

  public setProfile(profile: Profile){
    this.profile = profile;
  }

  public setCategories(categories: Category[]){
    this.categories = categories;
  }
}
