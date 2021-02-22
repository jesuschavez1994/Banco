/**
 * ¿Habra otra manera de colocarlo menos extenso y tediosa?
 *  La solución perfecta para evitar colocar nombres extensos, es utilizar namespace
 * para importar las interfaces por ejemplo de esta manera, Namespace.Category
 * Pero tslint en la configuración para angular esta desactivado.
 * al investigar encontre que se debe a que el compilador de angular o typescript
 * aun no sabe transpilar a la perfección el uso de namespace a js 2015, podemos
 * utilizar los namespace y transpilara, pero puede resultar en un error
 * porque el transpilador o compilador, puede llegar a procesar primero unos
 * namespace antes que otros.
 *
 * ejemplo de declaración de namespace:
 *
 * export Namespace {
 *
 *    export interface SidebarListOptions {
 *      profile: ProfileOptions;
 *      categories: CategoryOptions[];
 *    }
 *
 * }
 *
 */
export interface SidebarListOptions {
  anchorsMenu: AnchorsMenu;
  profile: Profile;
}

export interface Profile {
  name: string;
  contact: Contact;
  img: string;
  isVerified: boolean;
}

export interface Contact {
  url: string;
  name: string;
}

export interface AnchorsMenu {
  productLink: string;
  contactLink: string;
  wordToMatch: string;
  synchronizationLink?: string;
  salesLink?: string;
}

// Filters
export interface Filter {
  filterId?: number;
  title: string;
  type: 'single' | 'multiple';
  paramName: string;
  parentFilterId?: number;
  options: Option[];
}

export interface Option {
  optionId?: number;
  parentOptionId?: number;
  name: string;
  value?: any[] | any;
  totalFounds: number;
  isSelected?: boolean;
}

// Others

export interface SelectedEmitter {
  currentCategory;
  isSelectedCategory: boolean;
  SelectedSubCategories?;
}

// Activated Routes //

export interface ActivatedRoutesParams{
  url: string;
}
