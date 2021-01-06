export interface DropdownMenu {
  title: string;
  color?: string;
  divider?: boolean;
  typeEvent?: 'routerLink' | 'aHref' | 'none';
  eventValue?: string | string[];
}

export interface TitleButton {
  title: string;
  color: string;
}

export interface ClassIcon {
  class: string;
  color: string;
}
