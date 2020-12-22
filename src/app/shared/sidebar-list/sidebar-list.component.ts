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
  @Output() selected = new EventEmitter<SelectedEmitter | any>();

  @Input() profile: Profile;
  @Input() categories: Category[] = [];

  currentCategory: Category;

  categorySelected = {
    id: -1,
    name: '',
  };

  subCategoriesSelected = [];

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
    this.loadCategoryByUrl();

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

  public loadCategoryByUrl() {

    this.route.queryParamMap.subscribe( queryParamMap => {

      if (queryParamMap.has('category')){

        // Category
        const category = queryParamMap.get('category');

        // console.log('categories: ', this.categories);

        this.categories.forEach( cat => {

          if (cat.name === category){

            // console.log('cat.name === category: ', cat);

            this.categorySelected = {
              id: cat.id,
              name: cat.name,
            };

            this.currentCategory = cat;

          }

        });

        // Category //

        // SubCategory

        if (queryParamMap.has('subcategories')) {
          const subCategoryParam = this.stringToArray(queryParamMap.get('subcategories'));

          // console.log('subCategoryParam queryParams', subCategoryParam);

          this.categories.forEach( cat => {

            cat.subcategories.forEach(subcat => {

              subCategoryParam.forEach(subcatParam => {

                if (subcat.name === subcatParam) {
                  const inxFindSubCarselected = this.subCategoriesSelected.indexOf(subcatParam);
                  // console.log('inxFindSubCarselected - ' + subcatParam, inxFindSubCarselected);
                  if ( inxFindSubCarselected === -1 ) {

                    this.subCategoriesSelected.push(subcat.name);

                  }

                }
              });

            });

          });
          // console.log('subCategoriesSelected', this.subCategoriesSelected);
        }else {
          this.subCategoriesSelected = [];
        }

        // SubCategory //

      }else {
        this.categorySelected = {
          id: -1,
          name: '',
        };

        this.subCategoriesSelected = [];
      }

      this.selected.emit({
      currentCategory: this.categorySelected,
      // SelectedSubCategories: this.currentSubcategories
    });

      // console.log('this.categories', this.categories);

    });
  }

  public selectCategory(category){

  }

  public selectSubCategories(subcategory) {

  }

  // Volver un utils
  public stringToArray(paramString: string, isNumbers: boolean = false, separador: string = ','){
    const arrayString = paramString.split(separador);

    return isNumbers === false ? arrayString: arrayString.map( stringToConvert => {
      return parseInt(stringToConvert);
    });

  }

  public setProfile(profile: Profile){
    this.profile = profile;
  }

  public setCategories(categories: Category[]){
    this.categories = categories;
  }

}
