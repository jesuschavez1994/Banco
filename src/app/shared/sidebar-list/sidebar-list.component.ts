import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, HostListener, AfterViewInit
} from '@angular/core';
import {
  Category, Profile, SidebarListOptions, AnchorsMenu,
  SelectedEmitter, Filter, PriceRange
} from '@interfaces/components-options/sidebar-list.options.interface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Utils } from '../../utils/utils';

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
  @Input() factories: Filter[] = [];
  @Input() delivery: Filter[] = [];
  @Input() marks: Filter[] = [];

  // Selected Filters

  // // category
  currentCategory: Category;

  categorySelected: Filter = {
    id: -1,
    name: '',
  };

  subCategoriesSelected = []; // : Filter[]

  // // Price Range
  priceRangesSelected: PriceRange = {
    id: -1,
    min: -1,
    max: -1,
    totalFounds: -1
  };

  // // Factory
  factoriesSelected = [];

  // // Delivery
  deliverySelected = [];

  // // marks
  marksSelected = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils
  ){ }

  ngOnInit(): void {

    if (this.sidebarOptions) {
      this.anchorsMenu = this.sidebarOptions.anchorsMenu;
      this.profile = this.sidebarOptions.profile;
      this.categories = this.sidebarOptions.categories;
    }

    this.currentCategory = this.categories[0];
    this.initFilter(['priceRanges', 'factories', 'delivery', 'marks']);

  }

  ngAfterViewInit(): void {
    this.routerLinkActive();
    this.loadWithUrlParams();

  }

  public initFilter(atributteNames: string[]) {

    atributteNames.forEach((atributteName, index = 0) => {

      // console.log('initFilter - atributteName - before: ', this[atributteName]);

      if (this[atributteName]) {

        if (Array.isArray(this[atributteName])) {

          if (this[atributteName].length > 0) {

            this[atributteName].forEach((filter, index = 0) => {
              filter.id = index;
            });

          }

        } else {
          this[atributteName].id = 0;
        }

      }

      // console.log('initFilter - atributteName: ', this[atributteName]);
    });

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
  public loadWithUrlParams() {
    this.route.queryParamMap.subscribe(queryParamMap => {

      // // Category and subCategories
      this.loadCategoryByUrl(queryParamMap);
      this.loadPriceRangeByUrl(queryParamMap);
      this.loadOptionsFilter(queryParamMap, 'fabricantes',
        {
          allowedOptions: 'factories',
          selected: 'factoriesSelected',
          toMatch: 'name'
        }
      );

      // delivery
      this.loadOptionsFilter(queryParamMap,
        'delivery',
        {
          allowedOptions: 'delivery',
          selected: 'deliverySelected',
          toMatch: 'name'
        },
        true
      );

      this.loadOptionsFilter(queryParamMap,
        'marcas',
        {
          allowedOptions: 'marks',
          selected: 'marksSelected',
          toMatch: 'name'
        }
      );

    });

  }

  // // Category and subCategories
  public loadCategoryByUrl(queryParamMap) {

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

      this.subCategoriesSelected = [];

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

      }

      // else {
      //   this.subCategoriesSelected = [];

      // }

      // SubCategory //

    } else {
      this.categorySelected = {
        id: -1,
        name: '',
      };

      this.subCategoriesSelected = [];
    }

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

  public loadPriceRangeByUrl(queryParamMap: ParamMap) {
    const queryName = 'price';
    const allowedRanges = this.priceRanges;

    if (queryParamMap.has(queryName)) {

      const arrayQueParams = this.utils.stringToArray(queryParamMap.get(queryName), true);

      const isInxAllowedRanges = allowedRanges.findIndex(range => {
        return range.min === arrayQueParams[0] &&
        range.max === arrayQueParams[1];
      });

      if (isInxAllowedRanges > -1) {

        this.priceRangesSelected = allowedRanges[isInxAllowedRanges];

      } else {
        this.priceRangesSelected = {
          id: -1,
          min: -1,
          max: -1,
          totalFounds: -1
        };
      }

    } else {
      this.priceRangesSelected = {
        id: -1,
        min: -1,
        max: -1,
        totalFounds: -1
      };

    }

  }


  public selectPriceRange(range) {
    let queryParams;

    queryParams = {};

    if (range !== this.priceRangesSelected) {

      queryParams.price = `${range.min},${range.max}`;


    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,

      }
      );
  }

  // // Standard Filter
  public loadOptionsFilter(
    queryParamMap: ParamMap,
    queryPMName: string,
    atributtesName: {
      allowedOptions: string,
      selected: string, // El atributo donde se guardaran los seleccionados
      //  el atributo con el cual se comparara el valor recibido desde la url con los calores permitidos de filtrado
      toMatch: string
    },
    isSingleOption = false
  ){

    this[atributtesName.selected] = []; // this[atributtesName.allowedOptions]

    if (queryParamMap.has(queryPMName)) {

      const paramsValues = this.utils.stringToArray(queryParamMap.get(queryPMName));

      paramsValues.forEach(paramValue => {

        this[atributtesName.allowedOptions].forEach(allowedOption => {

          const allowedOptionValue = allowedOption[atributtesName.toMatch];

          if (paramValue === allowedOptionValue) {

            if (isSingleOption){
              this[atributtesName.selected] = [];
            }

            const inxWasSelected = this[atributtesName.selected].indexOf(paramValue);

            if (inxWasSelected === -1) {

              this[atributtesName.selected].push(allowedOptionValue);

            }

          }

        });

      });


    }

  }

  public selectOptionsFilter(
    optionValue,
    selectedAtributteName: string,
    paramName: string,
    isSingleOption = false
  ){

    let queryParams;
    const inxWasSelected = this[selectedAtributteName].indexOf(optionValue);

    console.log('this[selectedAtributteName] before: ', this[selectedAtributteName]);

    if (inxWasSelected === -1) {

      if (isSingleOption) {
        this[selectedAtributteName] = [];
      }

      this[selectedAtributteName].push(optionValue);


    } else {

      this[selectedAtributteName].splice(inxWasSelected, 1);

    }

    console.log('this[selectedAtributteName] after: ', this[selectedAtributteName]);

    queryParams = {};

    if (this[selectedAtributteName].length > 0) {

      const optionsSToqueryP = this[selectedAtributteName].join();

      queryParams[paramName] = optionsSToqueryP;

    }

    let navigationOptions;

    navigationOptions = {
      relativeTo: this.route,
    };

    if (Object.keys(queryParams).length > 0) {
      navigationOptions = {
        relativeTo: this.route,
        queryParams,
      };
    }

    this.router.navigate(
      [],
      navigationOptions
    );
  }

}
