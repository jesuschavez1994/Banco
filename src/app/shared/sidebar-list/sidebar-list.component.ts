import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, HostListener, AfterViewInit
} from '@angular/core';
import {
  Profile, SidebarListOptions, AnchorsMenu,
  SelectedEmitter, Filter, Option
} from '@interfaces/components-options/sidebar-list.options.interface';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
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

  // Selected Filters
  @Input() optionsFilters: Filter[] = [
    {
      // filterId: 1,
      title: 'categorías',
      type: 'single', // Determinamos que solo una opción puede ser seleccionada
      paramName: 'categoria',
      options: [
        {
          // optionId: 1,
          name: 'Cosmeticos',
          totalFounds: 200,
          // isSelected: false
        },
        {
          // optionId: 2,
          name: 'Alimentos',
          totalFounds: 200,
          // isSelected: false
        },
      ]
    },
    {
      // filterId: 2,
      title: 'sub categorías', // Titilo del listado de filtro
      type: 'multiple', // Determina si es de opción multiple
      paramName: 'sub-categoria', // Determina el queryParam a agregar
      parentFilterId: 1, // Determinamos con el nombre el listado de filtro a vinculo con este listado de filtro
      options: [ // opciones disponibles a agregar
        {
          // optionId: 1,
          parentOptionId: 1, // El id identificador de la opción de la cual depende
          name: 'labial', // nombre de la opción
          totalFounds: 200, // total de resultados a esperar con este filtro
          // isSelected: false // Representa el estado de la opción seleccionada o no.
        },
        {
          // optionId: 2,
          parentOptionId: 1,
          name: 'labia2',
          totalFounds: 200,
          // isSelected: false
        },
        {
          // optionId: 3,
          parentOptionId: 2,
          name: 'labial3',
          totalFounds: 200,
          // isSelected: false
        },
      ]
    },
    {
      // filterId: 3,
      title: 'Precios',
      type: 'single', // Determinamos que solo una opción puede ser seleccionada
      paramName: 'price',
      options: [
        {
          // optionId: 1,
          name: '$0 - $10,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          // optionId: 2,
          name: '$10,000 - $20,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          // optionId: 3,
          name: '$20,000 - $30,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          // optionId: 3,
          name: '$30,000 - $40,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          // optionId: 3,
          name: '$40,000 - $50,000',
          totalFounds: 200,
          // isSelected: false
        },
      ]
    },
  ];

  @Input() isLocalFilter = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils
  ){ }

  ngOnInit(): void {

    if (this.sidebarOptions) {
      this.anchorsMenu = this.sidebarOptions.anchorsMenu;
      this.profile = this.sidebarOptions.profile;
    }


    this.initFilter();


  }

  ngAfterViewInit(): void {
    this.routerLinkActive();
    this.getQueryParams();

  }

  public initFilter(isLocalFilter: boolean = this.isLocalFilter) {

    this.isLocalFilter = true;

    // Asignamos a los identificadores únicos sus valores únicos de los filtros
    this.optionsFilters.forEach( (optionFilter, index) => {

      if (this.isLocalFilter) {
        optionFilter.filterId = index += 1;
      }

      optionFilter.options.forEach( (optionOfFilter, inx) => {

        if (this.isLocalFilter) {
          optionOfFilter.optionId = inx += 1;
        }

        optionOfFilter.isSelected = false;

      });

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

  public getQueryParams() {
    this.route.queryParamMap.subscribe( queryParam => {

      this.loadOptionsFilter( queryParam );

    });


  }

  // // Standard Filter
  public loadOptionsFilter( queryParam: ParamMap ){

    const queryKeys = queryParam.keys;

    if (queryKeys.length > 0) {

      queryKeys.forEach( queryKey => {

        const filterMatched = this.optionsFilters.find( opFilter => {
          return opFilter.paramName === queryKey;
        });

        if (filterMatched) {

          let queryValue;
          queryValue = queryParam.get(queryKey);

          if (filterMatched.type === 'single') {

            const optionMatched = filterMatched.options.find( filterMatchedOption => {
              return filterMatchedOption.name === queryValue;
            });

            if (optionMatched) {
              this.markOption( optionMatched, filterMatched, false);
            }



          }else if (filterMatched.type === 'multiple') {

            const queryValues = this.utils.stringToArray(queryValue);

            if (queryValues.length > 0) {

              queryValues.forEach(queryValueForEach => {

                const optionMatched = filterMatched.options.find( filterMatchedOption => {
                  return filterMatchedOption.name === queryValueForEach;
                });

                if (optionMatched) {
                  this.markOption( optionMatched, filterMatched, false);
                }

              });

            }
          }
        }

      });

    }

  }


  public selectOptionsFilter2(
    option: Option,
    list: Filter
  ){

    let navigationOptions;
    let queryParams;

    // seleccionamos las opciones de filtro y creamos el queryParam
    queryParams = this.markOption( option, list );

    // Navigation With Filters

    navigationOptions = {
      relativeTo: this.route,
    };

    this.optionsFilters.forEach( filter => {
      // queryParams[]
      if (filter.type === 'single') {

        const optionSelected = filter.options.find( filterOption => {
          return filterOption.isSelected;
        });

        if (optionSelected) {

          queryParams[filter.paramName] = optionSelected.name;

        } else {

          delete queryParams[filter.paramName];

        }

      } else if (filter.type === 'multiple') {

        const optionsSelected = filter.options.filter( filterOption => {
         return filterOption.isSelected;
        });

        if (optionsSelected.length > 0) {

          const valuesOfQueryParam = optionsSelected.map( optionSelected => {
            return optionSelected.name;
          });

          queryParams[filter.paramName] = valuesOfQueryParam.join();

          if (filter.parentFilterId) { // En caso de tener un filtrado padre, agregar el query param del padre

            const parentFilter = this.optionsFilters.find( optionFilter => {
              return optionFilter.filterId === filter.parentFilterId;
            });

            const parentOptionSelected = parentFilter.options.find( parentFilterFind => {
              return parentFilterFind.isSelected;
            });

            if (parentOptionSelected) { // si existe una opcion del padre seleccionada, agrego el queryParam del padre

              // agregamos el paramQuery del parentFilter
              queryParams[parentFilter.paramName] = parentOptionSelected.name;

            } else { // en caso contrario elimino el queryParam

              delete queryParams[parentFilter.paramName];

            }

          }

        }else {

          delete queryParams[filter.paramName];

        }

      }

    });

    // console.log(queryParams);

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

  public getFilter( filter ) {

    // console.log('getFilter');
    // console.log(filter);

    if (filter.parentFilterId) {

      // console.log('filter.parentFilterId');
      // console.log(filter.parentFilterId);

      const parentFilter = this.optionsFilters.find( optionsFilter => {
        return optionsFilter.filterId === filter.parentFilterId;
      });

      // console.log('parentFilter');
      // console.log(parentFilter);

      const parentOption = parentFilter.options.find ( parentFilterOption => {
        return parentFilterOption.isSelected;
      });

      // console.log('parentOption');
      // console.log(parentOption);

      // Si encuentra una opción del parent Filter seleccionada
      // Si es undefined es porque todos son false, es decir no están seleccionadas
      if (parentOption) {

        const filterOptions = filter.options.filter(filterOption => {
          return filterOption.parentOptionId === parentOption.optionId;
        });

        // console.log('filterOptions');
        // console.log(filterOptions);

        return filterOptions;

      }else { // si no hay ninguna parentOption seleccionada mostrar las primeras con el mismo parent Option Id

        const parentOptionId = filter.options[0].parentOptionId;

        const filterOptionsByDefault = filter.options.filter(filterOption => {
          return filterOption.parentOptionId === parentOptionId;
        });

        return filterOptionsByDefault;

      }

    }

    return filter.options;

  }

  public markOption(
    option: Option,
    list: Filter,
    toggleOption: boolean = true,
    selectTheOption: boolean = true
  ){

    let queryParams;
    queryParams = {};

    if (list.type === 'multiple') {

      if (toggleOption) {

        option.isSelected = option.isSelected ? false : true; // Marca como check o no

      }else {

        option.isSelected = selectTheOption; // Marca como check o no

      }

      if (list.parentFilterId) { // se ejecuta cuando la lista determina que sus opciones dependen de una lista padre

        // Obtenemos al listado de opciones de filtro padre el cual es vinculado con su titulo como
        // padre del la lista de filtrado de la opción seleccionada
        const parentOptionsFilter = this.optionsFilters.find( optionsFilter => optionsFilter.filterId === list.parentFilterId );

        if (parentOptionsFilter) {

          const parentOption = parentOptionsFilter.options.find(
          parentFilterOption => parentFilterOption.optionId === option.parentOptionId
          );


          if (parentOption) { // Marcamos el parent option

            if (option.isSelected) {
              // Desmarcando todas las opciones del padre, porque los parent siempre serán de tipo single
              parentOptionsFilter.options.forEach(parentFilterOption => {
              parentFilterOption.isSelected = false;
              });

              parentOption.isSelected = true; // Marcamos la opción padre

            }

            // Si todas las opciones est´n desmarcadas, desmarcamos al padre
            // y eliminamos el query param del padre e hijo
            if ( list.options.every( lOption => lOption.isSelected === false) ) {

              parentOption.isSelected = false;

            }

          }
        }

      }

    } else if (list.type === 'single') {

      // Desmarcando todas las opciones (parents o singles) que no sean la opción a seleccionar
      const filterOptionsDisallowed = list.options.filter( lOption => {
          return lOption.optionId !== option.optionId;
      });

      filterOptionsDisallowed.forEach(filterOptionDisallowed => {
          filterOptionDisallowed.isSelected = false;
      });

      if (toggleOption) {

        option.isSelected = option.isSelected ? false : true; // Marca como check o no 1 opción

      }else {

        option.isSelected = selectTheOption; // Marca como check o no 1 opción

      }

      // Obtenemos los filtros que son hijos o subFiltros de este
      // Es decir, que posean el mismo parentFilterId que el filter Id del listado que estamos evaluando
      const subFilters = this.optionsFilters.filter( optionsFilter => {

        if (optionsFilter.parentFilterId) {
        return optionsFilter.parentFilterId === list.filterId;
        }

        return false;

      });

      // Desmarcamos todas las opciones de los sub filters del parentFilter correspondiente al cambiar de parentOption
      if ( subFilters.length > 0 ) {

        subFilters.forEach( subFilter => {

          subFilter.options.forEach( subFilterOption => {
            subFilterOption.isSelected = false;
          });

        });

      }

      queryParams[list.paramName] = option.name;

    }

    return queryParams;
  }

}
