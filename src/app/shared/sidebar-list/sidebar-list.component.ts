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

  // Selected Filters
  @Input() optionsFilters = [
    {
      filterId: 1,
      title: 'categorías',
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
      title: 'sub categorías', // Titilo del listado de filtro
      type: 'multiple', // Determina si es de opción multiple
      paramName: 'sub-categoria', // Determina el queryParam a agregar
      parentFilterId: 1, // Determinamos con el nombre el listado de filtro a vinculo con este listado de filtro
      options: [ // opciones disponibles a agregar
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
          parentOptionId: 2,
          name: 'labial3',
          totalFounds: 200,
          isSelected: false
        },
      ]
    },
    {
      filterId: 1,
      title: 'Precios',
      type: 'single', // Determinamos que solo una opción puede ser seleccionada
      paramName: 'price',
      options: [
        {
          optionId: 1,
          name: '$0 - $10,000',
          totalFounds: 200,
          isSelected: false
        },
        {
          optionId: 2,
          name: '$10,000 - $20,000',
          totalFounds: 200,
          isSelected: false
        },
        {
          optionId: 3,
          name: '$20,000 - $30,000',
          totalFounds: 200,
          isSelected: false
        },
        {
          optionId: 3,
          name: '$30,000 - $40,000',
          totalFounds: 200,
          isSelected: false
        },
        {
          optionId: 3,
          name: '$40,000 - $50,000',
          totalFounds: 200,
          isSelected: false
        },
      ]
    },
  ];


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

  }

  public initFilter() {

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

            } else { // obtenemos las opciones seleccionadas y las concatenamos para formar el queryParam

              // Obtenemos todas las opciones de la lista seleccionadas
              const optionsSelected = list.options.filter( lOption => {
                return lOption.isSelected;
              });


              // si existen opciones seleccionadas, agregar esas opciones al queyParam junto a su parentFilter
              if (optionsSelected.length > 0) {

                const optionsSelectedNames = optionsSelected.map(optionsSelectedMap => {
                  return optionsSelectedMap.name;
                });

              }

            }

          }
        }

      }

    }else if (list.type === 'single') {

      // Desmarcando todas las opciones (parents o singles)
      list.options.forEach(listFilterOption => {
        listFilterOption.isSelected = false;
      });

      option.isSelected = option.isSelected ? false : true; // marcar o desmarcar 1 opción

      // Obtenemos los filtros que son hijos o subFiltros de este
      // Es decir, que posean el mismo parentFilterId que el filter Id del listado que estamos evaluando
      const subFilters = this.optionsFilters.filter( optionsFilter => {

        if (optionsFilter.parentFilterId) {
          return optionsFilter.parentFilterId === list.filterId;
        }

        return false;

      });

      // Desmarcamos todas las opciones de los sub filters al cambiar de parentOption
      if ( subFilters.length > 0 ) {

        subFilters.forEach( subFilter => {

          subFilter.options.forEach( subFilterOption => {
            subFilterOption.isSelected = false;
          });

        });

      }

      queryParams[list.paramName] = option.name;

    }


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

    console.log(queryParams);

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

}
