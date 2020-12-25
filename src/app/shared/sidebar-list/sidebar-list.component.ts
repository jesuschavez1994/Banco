import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, HostListener, AfterViewInit, Renderer2
} from '@angular/core';
import {
  Category, Subcategory, Profile, SidebarListOptions, AnchorsMenu,
  SelectedEmitter
} from '@interfaces/components-options/sidebar-list.options.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../../utils/utils';
import { PriceRange } from '@interfaces/components-options/sidebar-list.options.interface';

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

  // filters
  @Input() categories: Category[] = [];
  @Input() priceRanges: PriceRange[] = [];

  // Selected Filters

  // // category
  currentCategory: Category;

  categorySelected = {
    id: -1,
    name: '',
  };

  subCategoriesSelected = [];

  // // Price Range
  priceRangesSelected: PriceRange = {
    id: -1,
    min: -1,
    max: -1,
    totalFounds: -1
  };

  constructor(
    private route: ActivatedRoute, private router: Router,
    private utils: Utils, private render: Renderer2
  ) { }

  ngOnInit(): void {
    if (this.sidebarOptions) {
      this.anchorsMenu = this.sidebarOptions.anchorsMenu;
      this.profile = this.sidebarOptions.profile;
      this.categories = this.sidebarOptions.categories;
    }
    this.currentCategory = this.categories[0];

    if (this.priceRanges.length > 0) {
      this.priceRanges.forEach(( range, index = 0) => {
        range.id = index;
      });
    }

  }

  ngAfterViewInit(): void {
    this.routerLinkActive();
    this.loadCategoryByUrl();

    this.loadPriceRangeByUrl();

  }

  @HostListener('window:scroll', ['$event'])
  public fixedSidebar($event: Event) {

    const sidebarList = this.sidebarList.nativeElement;
    const pxTopElement = sidebarList.offsetTop;
    const pxTopDocument = document.documentElement.scrollTop;

    if (pxTopDocument > pxTopElement) {
      sidebarList.classList.add('aside--fixed');
    } else {
      sidebarList.classList.remove('aside--fixed');
    }

  }

  public toggleSidebarList(event) {
    this.isExpanded = event;
    this.sidebarExpand.emit(this.isExpanded);

  }

  public routerLinkActive() {

    this.productsOptionMenu.nativeElement.classList.remove('active');
    this.contactoOptionMenu.nativeElement.classList.remove('active');

    this.route.paramMap.subscribe(params => {

      if ((params.has('show') && params.get('show') === this.anchorsMenu.wordToMatch)) {
        this.productsOptionMenu.nativeElement.classList.add('active');

      } else {
        this.contactoOptionMenu.nativeElement.classList.add('active');

      }

    });

  }

  // Filters

  // // Category and subCategories
  public loadCategoryByUrl() {

    this.route.queryParamMap.subscribe(queryParamMap => {

      if (queryParamMap.has('category')) {

        // Category
        const category = queryParamMap.get('category');

        this.categories.forEach(cat => {

          if (cat.name === category) {

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
          const subCategoryParam = this.utils.stringToArray(queryParamMap.get('subcategories'));

          this.categories.forEach(cat => {

            cat.subcategories.forEach(subcat => {

              subCategoryParam.forEach(subcatParam => {

                if (subcat.name === subcatParam) {
                  const inxFindSubCarselected = this.subCategoriesSelected.indexOf(subcatParam);

                  if (inxFindSubCarselected === -1) {

                    this.subCategoriesSelected.push(subcat.name);

                  }

                }
              });

            });

          });

        } else {
          this.subCategoriesSelected = [];

        }

        // SubCategory //

      } else {
        this.categorySelected = {
          id: -1,
          name: '',
        };

        this.subCategoriesSelected = [];
      }

    });
  }

  public selectCategory(category) {
    let queryParams;

    if (category.name === this.categorySelected.name) {
      queryParams = {};

    } else {
      queryParams = { category: category.name };

    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,

      }
    );

  }

  public selectSubCategories(subcategory) {

    const inxSubCatSelected = this.subCategoriesSelected.indexOf(subcategory.name);
    let navigationOptions;

    this.categorySelected = {
      id: this.currentCategory.id,
      name: this.currentCategory.name,
    };

    if (inxSubCatSelected === -1) {
      this.subCategoriesSelected.push(subcategory.name);

    } else {
      this.subCategoriesSelected.splice(inxSubCatSelected, 1);

    }

    navigationOptions = {
      relativeTo: this.route,
      queryParams: {
        category: this.categorySelected.name,
      }
    };

    if (this.subCategoriesSelected.length > 0) {

      const subCatToqueryParams = this.subCategoriesSelected.join();

      navigationOptions.queryParams.subcategories = subCatToqueryParams;

    }

    this.router.navigate(
      [],
      navigationOptions
    );
  }

  // // Price Range - independiente

  public loadPriceRangeByUrl() {

    this.route.queryParamMap.subscribe(queryParamMap => {

      const queryName = 'price';
      const allowedRanges = this.priceRanges;

      if (queryParamMap.has(queryName)) {

        const arrayQueParams = this.utils.stringToArray(queryParamMap.get(queryName), true);

        const isInxAllowedRanges = allowedRanges.findIndex(range => {
          return range.min === arrayQueParams[0] &&
          range.max === arrayQueParams[1];
        });

        if (isInxAllowedRanges > -1){

          this.priceRangesSelected = allowedRanges[isInxAllowedRanges];

        }else{
          this.priceRangesSelected = {
            id: -1,
            min: -1,
            max: -1,
            totalFounds: -1
          };
        }

      }else {
        this.priceRangesSelected = {
          id: -1,
          min: -1,
          max: -1,
          totalFounds: -1
        };

        // console.log('atributteSelected - after: ', atributteSelected);
      }

    });

  }


  public selectPriceRange(range, event){
    let queryParams;

    queryParams = {};

    const input = event.srcElement.parentNode.previousSibling;
    const li = event.srcElement.parentNode.parentNode;

    if (range !== this.priceRangesSelected) {

      queryParams.price = `${range.min},${range.max}`;

      li.classList.remove('offActive');

    } else {

      li.classList.add('offActive');
      input.checked = false;

    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,

      }
    );
  }

  // Others
  public setProfile(profile: Profile) {
    this.profile = profile;
  }

  public setCategories(categories: Category[]) {
    this.categories = categories;
  }

}
