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
  optionsFilters = [
    {
      filterId: 1,
      title: 'categorias2',
      type: 'single', // Determinamos que solo una opción puede ser seleccionada
      paramName: 'categoria',
      options: [
        {
          optionId: 1,
          name: 'Cosmeticos',
          totalFounds: 200,
          isSelected: false
        },
        {
          optionId: 2,
          name: 'Alimentos',
          totalFounds: 200,
          isSelected: false
        },
      ]
    },
    {
      filterId: 2,
      title: 'categorias3', // Titilo del listado de filtro
      type: 'multiple', // Determina si es de opción multiple
      paramName: 'sub-categoria', // Determina el queryParam a agregar
      parentFilterId: 1, // Determinamos con el nombre el listado de filtro a vinculo con este listado de filtro
      options: [ // optiones disponebles a agregar
        {
          optionId: 1,
          parentOptionId: 1, // El id identificador de la opción de la cual depende
          name: 'labial', // nombre de la opción
          totalFounds: 200, // total de resultados a esperar con este filtro
          isSelected: false // Representa el estado de la opción seleccionada o no
        },
        {
          optionId: 2,
          parentOptionId: 1,
          name: 'labia2',
          totalFounds: 200,
          isSelected: false
        },
        {
          optionId: 3,
          parentOptionId: 1,
          name: 'labial3',
          totalFounds: 200,
          isSelected: false
        },
      ]
    },

  ];

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

    if (this.sidebarList) {

      const sidebarList = this.sidebarList.nativeElement;
      const pxTopElement = sidebarList.offsetTop;
      const pxTopDocument = document.documentElement.scrollTop;

      if (pxTopDocument > pxTopElement) {
        sidebarList.classList.add('aside--fixed');

      } else {
        sidebarList.classList.remove('aside--fixed');

      }

    }

  }

  public toggleSidebarList(event) {
    this.isExpanded = event;
    this.sidebarExpand.emit(this.isExpanded);
    console.log('isExpanded', event);

  }

  public routerLinkActive() {

    if (this.productsOptionMenu){
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

  public selectOptionsFilter2(
    option,
    list

  ){

    let navigationOptions;
    let queryParams;

    queryParams = {};

     // Marca como check o no

    console.log('option');
    console.log(option);

    console.log('list');
    console.log(list);

    if (list.type === 'multiple') {
      option.isSelected = option.isSelected ? false : true;

      if (list.parentFilterId) { // se ejecuta cuando la lista determina que sus opciones dependen de una lista padre

        console.log('list.parentFilterId');
        console.log(list.parentFilterId);

        // Obtenemos al listado de opciones de filtro padre el cual es vinculado con su titulo como
        // padre del la lista de filtrado de la opción seleccionada
        const parentOptionsFilter = this.optionsFilters.find( optionsFilter => optionsFilter.filterId === list.parentFilterId );

        console.log('parentOptionsFilter');
        console.log(parentOptionsFilter);

        if (parentOptionsFilter) {

          const parentOption = parentOptionsFilter.options.find(
            parentFilterOption => parentFilterOption.optionId === option.parentOptionId
          );

          console.log('parentOption');
          console.log(parentOption);

          if (parentOption) {

            if (option.isSelected) {
              // Desmarcando todas las opciones del padre, porque los parent siempre serán de tipo single
              parentOptionsFilter.options.forEach(parentFilterOption => {
                parentFilterOption.isSelected = false;
              });

              parentOption.isSelected = true; // Marcamos la opción padre

              queryParams[parentOptionsFilter.paramName] = parentOptionsFilter.title;

            }else{

              if ( list.options.every( lOption => lOption.isSelected === false) ) {
                parentOption.isSelected = false;
                queryParams = {};

              }

            }

          }
        }

      }

    }else if (list.type === 'single') {

      // Desmarcando todas las opciones
      list.options.forEach(listFilterOption => {
        listFilterOption.isSelected = false;
      });

      option.isSelected = option.isSelected ? false : true; // marcar o desmarcar 1 opción

      // Obtenemos los listados con opciones de filtro
      // que posean el mismo parentFilterId que el filter Id del listado que estamos evaluando
      const optionsFiltersWithParents = this.optionsFilters.filter( optionsFilter => {

        if (optionsFilter.parentFilterId) {
          return optionsFilter.parentFilterId === list.filterId;
        }

        return false;

      });

      // Si se encuentran filters
      if ( optionsFiltersWithParents.length > 0 ) {

        optionsFiltersWithParents.forEach(optionsFilterWithParents => {
          const isEverySubOptionSelected = optionsFilterWithParents.options.every(
            subFilterOption => subFilterOption.isSelected === false
          );
        });


      }

    }

    if (option.isSelected) {
      queryParams[list.paramName] = option.name;

    }else{
      queryParams = {};
    }

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
