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
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface Profile {
  name: string;
  instagram: Instagram;
  img: string;
  isVerified: boolean;
}

export interface Instagram {
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
  id?: number;
  name: string;
  totalFounds?: number | string;
}
export interface PriceRange {
  id?: number;
  min: number | string;
  max: number | string;
  totalFounds: number | string;
}

// Others

export interface SelectedEmitter {
  currentCategory: Category;
  isSelectedCategory: boolean;
  SelectedSubCategories?: Subcategory[];
}

// Activated Routes //

export interface ActivatedRoutesParams{
  url: string
}
