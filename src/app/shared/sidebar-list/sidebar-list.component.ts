import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import {
  Profile,
  SidebarListOptions,
  AnchorsMenu,
  SelectedEmitter,
  Filter,
  Option,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Utils } from '../../utils/utils';
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
})
export class SidebarListComponent implements OnInit, AfterViewInit, OnDestroy {
  // Elements
  @ViewChild('sidebarList') sidebarList: ElementRef;

  // Inputs
  @Input() isExpanded = false;
  @Input() sidebarTarget: SidebarListComponent;
  @Input() anchorsMenu: AnchorsMenu;
  @Input() sidebarOptions: SidebarListOptions;
  IMG_USER: string;

  // Outputs
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() selected = new EventEmitter<SelectedEmitter | any>();

  @Input() profile: Profile;

  // Selected Filters
  @Input() filters: Filter[] = [
    // {
    //   // filterId: 1,
    //   title: 'categorías',
    //   type: 'single', // Determinamos que solo una opción puede ser seleccionada
    //   paramName: 'categoria',
    //   options: [
    //     {
    //       // optionId: 1,
    //       name: 'Cosmeticos',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 2,
    //       name: 'Alimentos',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //   ]
    // },
    // {
    //   // filterId: 2,
    //   title: 'sub categorías', // Titilo del listado de filtro
    //   type: 'multiple', // Determina si es de opción multiple
    //   paramName: 'sub-categoria', // Determina el queryParam a agregar
    //   parentFilterId: 1, // Determinamos con el nombre el listado de filtro a vinculo con este listado de filtro
    //   options: [ // opciones disponibles a agregar
    //     {
    //       // optionId: 1,
    //       parentOptionId: 1, // El id identificador de la opción de la cual depende
    //       name: 'labial', // nombre de la opción
    //       totalFounds: 200, // total de resultados a esperar con este filtro
    //       // isSelected: false // Representa el estado de la opción seleccionada o no.
    //     },
    //     {
    //       // optionId: 2,
    //       parentOptionId: 1,
    //       name: 'labia2',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 3,
    //       parentOptionId: 2,
    //       name: 'labial3',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //   ]
    // },
    // {
    //   // filterId: 3,
    //   title: 'Precios',
    //   type: 'single', // Determinamos que solo una opción puede ser seleccionada
    //   paramName: 'price',
    //   options: [
    //     {
    //       // optionId: 1,
    //       name: '$0 - $10,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 2,
    //       name: '$10,000 - $20,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 3,
    //       name: '$20,000 - $30,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 3,
    //       name: '$30,000 - $40,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 3,
    //       name: '$40,000 - $50,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //   ]
    // },
  ];

  @Input() isLocalFilter = false;

  productOptionMenu = false;
  contactOptionMenu = false;
  // Anchor menu parameters
  anchorsMenuData: AnchorsMenu[];
  // Sections required to show
  requiredSections: SidebarSections;

  queryParams;
  // Data service subscription objects
  anchorsMenuDataSubscription: Subscription;
  sectionsToShowSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils,
    private _sidebarListService: SidebarListService,
    public usuarioService: UsuarioService
  ) {
    this.anchorsMenuDataSubscription = _sidebarListService.anchorsMenuData$.subscribe(
      (anchorsData: AnchorsMenu[]) => {
        this.anchorsMenuData = anchorsData;
      }
    );

    this.sectionsToShowSubscription = _sidebarListService.sectionsToShow$.subscribe(
      (sectionsData: SidebarSections) => {
        this.requiredSections = sectionsData;
      }
    );
  }

  ngOnInit(): void {
    console.log(this.sidebarOptions);

    if (this.sidebarOptions) {
      this.anchorsMenu = this.sidebarOptions.anchorsMenu;
      this.profile = this.sidebarOptions.profile;
    }

    this.initFilter();
  }

  ngAfterViewInit(): void {
    this.routerLinkActive();
  }

  ngOnDestroy(): void {
    // Preventing data leaks
    this.anchorsMenuDataSubscription.unsubscribe();
    this.sectionsToShowSubscription.unsubscribe();
  }

  public initFilter() {
    // Asignamos a los identificadores únicos sus valores únicos de los filtros
    this.filters.forEach((optionFilter, index) => {
      if (!optionFilter.filterId) {
        optionFilter.filterId = index += 1;
      }

      optionFilter.options.forEach((optionOfFilter, inx) => {
        if (!optionOfFilter.optionId) {
          optionOfFilter.optionId = inx += 1;
        }

        optionOfFilter.isSelected = false;
      });
    });
  }

  /**
   * @description La función retorna el listado de filters con sus identificadores únicos sobre escritos
   * de forma correcta o los agrega en caso de no tenerlos
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher<@>matiz.com.ve
   * @date 22/02/2021
   * @param {Filter[]} filters
   * @returns {*}  Filter[]
   * @memberof SidebarListComponent
   */
  public setFilters(filters: Filter[]): Filter[] {
    // Asignamos a los identificadores únicos sus valores únicos de los filtros
    filters.forEach((optionFilter, index) => {
      if (!optionFilter.filterId) {
        optionFilter.filterId = index += 1;
      }

      optionFilter.options.forEach((optionOfFilter, inx) => {
        if (!optionOfFilter.optionId) {
          optionOfFilter.optionId = inx += 1;
        }

        optionOfFilter.isSelected = false;
      });
    });

    this.filters = filters;
    return filters;
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
    this.productOptionMenu = false;
    this.contactOptionMenu = false;

    this.route.paramMap.subscribe((params) => {
      if (params.has('show')) {
        if (this.anchorsMenu) {
          if (params.get('show') === this.anchorsMenu.wordToMatch) {
            this.productOptionMenu = true;
          }
        }
      } else {
        this.contactOptionMenu = true;
      }
    });
  }

  // // Standard Filter
  public loadOptionsFilter(queryParam: ParamMap) {
    this.queryParams = queryParam; // guardamos de forma global los valores del queryParam de la URL

    const queryKeys = queryParam.keys;

    // console.log('loadOptionsFilter antes');
    // console.log(queryParam);

    // retorna true o false, si la opción tiene el mismo valor que el valor pasado por argumento
    // Si existe el atributo value en el option toma ese atributo para la comparación
    function isSameValue(argOption: Option, argQueryValue) {
      if (argOption.value) {
        let argOptionValue;
        argOptionValue = argOption.value;

        if (Array.isArray(argOptionValue)) {
          argOptionValue = argOptionValue.join();
        }

        return argOptionValue === argQueryValue;
      }

      return argOption.name === argQueryValue;
    }

    if (queryKeys.length > 0) {
      queryKeys.forEach((queryKey) => {
        let filterMatched;

        filterMatched = this.filters.find((opFilter) => {
          return opFilter.paramName === queryKey;
        });

        if (filterMatched) {
          let queryValue;
          queryValue = queryParam.get(queryKey);

          if (filterMatched.type === 'single') {
            const optionMatched = filterMatched.options.find(
              (filterMatchedOption) => {
                return isSameValue(filterMatchedOption, queryValue);
              }
            );

            if (optionMatched) {
              const queryParams = this.markOption(
                optionMatched,
                filterMatched,
                false
              );

              this.selected.emit({
                queryParams,
              });
            }
          } else if (filterMatched.type === 'multiple') {
            const queryValues = this.utils.stringToArray(queryValue);

            if (queryValues.length > 0) {
              queryValues.forEach((queryValueForEach) => {
                const optionMatched = filterMatched.options.find(
                  (filterMatchedOption) => {
                    return isSameValue(filterMatchedOption, queryValueForEach);
                  }
                );

                if (optionMatched) {
                  const queryParams = this.markOption(
                    optionMatched,
                    filterMatched,
                    false
                  );
                }
              });
            }
          }
        }
      });
    }

    // console.log('loadOptionsFilter despues');
    // console.log(queryParam);
  }

  /**
   * @description Se ejecuta cuando se realiza click sobre alguna opción de un filtro
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher<@>matiz.com.ve
   * @date 03/03/2021
   * @param {Option} option
   * @param {Filter} filter
   * @param {ParamMap} queryParam
   * @memberof SidebarListComponent
   */
  public selectOptionsFilter2(option: Option, filter: Filter) {
    let navigationOptions;
    let queryParams;

    // seleccionamos las opciones de filtro y creamos el queryParam
    queryParams = this.markOption(option, filter);

    // console.log('selectOptionsFilter2 antes');
    // console.log(queryParams);

    // Navigation With Filters

    navigationOptions = {
      relativeTo: this.route,
    };

    this.filters.forEach((filterFor) => {
      if (filterFor.type === 'single') {
        const optionSelected = filterFor.options.find((filterOption) => {
          return filterOption.isSelected;
        });

        if (optionSelected) {
          queryParams[filterFor.paramName] = this.getOptionSelectedValue(
            optionSelected
          );
        } else {
          delete queryParams[filterFor.paramName];
        }
      } else if (filterFor.type === 'multiple') {
        const optionsSelected = filterFor.options.filter((filterOption) => {
          return filterOption.isSelected;
        });

        if (optionsSelected.length > 0) {
          const valuesOfQueryParam = optionsSelected.map((optionSelected) => {
            return this.getOptionSelectedValue(optionSelected);
          });

          queryParams[filterFor.paramName] = valuesOfQueryParam.join();

          if (filterFor.parentFilterId) {
            // En caso de tener un filtrado padre, agregar el query param del padre

            const parentFilter = this.filters.find((optionFilter) => {
              return optionFilter.filterId === filterFor.parentFilterId;
            });

            const parentOptionSelected = parentFilter.options.find(
              (parentFilterFind) => {
                return parentFilterFind.isSelected;
              }
            );

            if (parentOptionSelected) {
              // si existe una opcion del padre seleccionada, agrego el queryParam del padre

              // agregamos el paramQuery del parentFilter
              queryParams[parentFilter.paramName] = this.getOptionSelectedValue(
                parentOptionSelected
              );
            } else {
              // en caso contrario elimino el queryParam

              delete queryParams[parentFilter.paramName];
            }
          }
        } else {
          delete queryParams[filterFor.paramName];
        }
      }
    });

    // console.log('selectOptionsFilter2 después');
    // console.log(queryParams);

    if (Object.keys(queryParams).length > 0) {
      this.queryParams = queryParams;

      navigationOptions = {
        relativeTo: this.route,
        queryParams,
      };
    }

    this.router.navigate([], navigationOptions);

    this.selected.emit({
      queryParams,
    });
  }

  public getFilter(filter) {
    if (filter.parentFilterId) {
      const parentFilter = this.filters.find((optionsFilter) => {
        return optionsFilter.filterId === filter.parentFilterId;
      });

      const parentOption = parentFilter.options.find((parentFilterOption) => {
        return parentFilterOption.isSelected;
      });

      // Si encuentra una opción del parent Filter seleccionada
      // Si es undefined es porque todos son false, es decir no están seleccionadas
      if (parentOption) {
        const filterOptions = filter.options.filter((filterOption) => {
          return filterOption.parentOptionId === parentOption.optionId;
        });

        return filterOptions;
      } else {
        // si no hay ninguna parentOption seleccionada mostrar las primeras con el mismo parent Option Id

        const parentOptionId = filter.options[0].parentOptionId;

        const filterOptionsByDefault = filter.options.filter((filterOption) => {
          return filterOption.parentOptionId === parentOptionId;
        });

        return filterOptionsByDefault;
      }
    }

    return filter.options;
  }

  public markOption(
    optionSelected: Option,
    filterSelected: Filter,
    toggleOption: boolean = true,
    selectTheOption: boolean = true
  ) {
    let queryParams;
    let queryParamsFormat;

    queryParams = {};
    queryParamsFormat = {};

    if (Object.keys(this.queryParams).length > 0) {
      if (this.queryParams.keys.length > 0) {
        queryParams = this.queryParams; // asignamos los valores previos del queryParam para no perder esos datos

        queryParams.keys.forEach((paramKey) => {
          queryParamsFormat[paramKey] = queryParams.get(paramKey);
        });

        // Agregamos los key y valor de los valores de los query params anteriores
        // Para que no sean eliminado al agregar a la url los query params de las
        // Opciones de filtrado
        queryParams = queryParamsFormat;
      }
    }

    if (filterSelected.type === 'multiple') {
      if (toggleOption) {
        optionSelected.isSelected = optionSelected.isSelected ? false : true; // Marca como check o no
      } else {
        optionSelected.isSelected = selectTheOption; // Marca como check o no
      }

      if (filterSelected.parentFilterId) {
        // se ejecuta cuando la lista determina que sus opciones dependen de una lista padre

        // Obtenemos al listado de opciones de filtro padre el cual es vinculado con su titulo como
        // padre del la lista de filtrado de la opción seleccionada
        const parentOptionsFilter = this.filters.find(
          (optionsFilter) =>
            optionsFilter.filterId === filterSelected.parentFilterId
        );

        if (parentOptionsFilter) {
          const parentOption = parentOptionsFilter.options.find(
            (parentFilterOption) =>
              parentFilterOption.optionId === optionSelected.parentOptionId
          );

          if (parentOption) {
            // Marcamos el parent option

            if (optionSelected.isSelected) {
              // Desmarcando todas las opciones del padre, porque los parent siempre serán de tipo single
              parentOptionsFilter.options.forEach((parentFilterOption) => {
                parentFilterOption.isSelected = false;
              });

              parentOption.isSelected = true; // Marcamos la opción padre
            }

            // Si todas las opciones est´n desmarcadas, desmarcamos al padre
            // y eliminamos el query param del padre e hijo
            if (
              filterSelected.options.every(
                (lOption) => lOption.isSelected === false
              )
            ) {
              parentOption.isSelected = false;
            }
          }
        }
      }
    } else if (filterSelected.type === 'single') {
      // Desmarcando todas las opciones (parents o singles) que no sean la opción a seleccionar
      const filterOptionsDisallowed = filterSelected.options.filter(
        (lOption) => {
          return lOption.optionId !== optionSelected.optionId;
        }
      );

      filterOptionsDisallowed.forEach((filterOptionDisallowed) => {
        filterOptionDisallowed.isSelected = false;
      });

      if (toggleOption) {
        optionSelected.isSelected = optionSelected.isSelected ? false : true; // Marca como check o no 1 opción
      } else {
        optionSelected.isSelected = selectTheOption; // Marca como check o no 1 opción
      }

      // Obtenemos los filtros que son hijos o subFiltros de este
      // Es decir, que posean el mismo parentFilterId que el filter Id del listado que estamos evaluando
      const subFilters = this.filters.filter((optionsFilter) => {
        if (optionsFilter.parentFilterId) {
          return optionsFilter.parentFilterId === filterSelected.filterId;
        }

        return false;
      });

      // Desmarcamos todas las opciones de los sub filters del parentFilter correspondiente al cambiar de parentOption
      if (subFilters.length > 0) {
        subFilters.forEach((subFilter) => {
          subFilter.options.forEach((subFilterOption) => {
            subFilterOption.isSelected = false;
          });
        });
      }

      queryParams[filterSelected.paramName] = this.getOptionSelectedValue(
        optionSelected
      );
    }

    return queryParams;
  }

  /**
   * @description Si existe value significa que el valor a colocar en el query param es el value
   * y no el name retorna optionSelected.name;
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher<@>matiz.com.ve
   * @date 21/02/2021
   * @private
   * @param {Option} optionSelected
   * @returns {*}  any
   * @memberof SidebarListComponent
   */
  private getOptionSelectedValue(optionSelected: Option) {
    const keyValue = 'value';

    if (optionSelected[keyValue]) {
      let optionSelectedValue;
      optionSelectedValue = optionSelected[keyValue];

      if (Array.isArray(optionSelectedValue)) {
        optionSelectedValue = optionSelectedValue.join();
      }

      return optionSelectedValue;
    }

    return optionSelected.name;
  }

  /**
   * Check if the router url contains the specified route.
   *
   * @returns {boolean} boolean
   */
  hasRoute(): boolean {
    if (
      this.router.url.includes('/my-store/contact') ||
      this.router.url.includes('/my-store/sincronizacion/')
    ) {
      return true;
    } else {
      return false;
    }
  }
}
