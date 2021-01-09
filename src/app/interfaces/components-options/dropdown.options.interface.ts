export interface DropdownOption {
  title: string;
  color?: string;
  divider?: boolean;
  typeEvent?: 'routerLink' | 'aHref' | 'none';
  eventValue?: string | string[];
  data?: any;
}

export interface TitleButton {
  title: string;
  color: string;
}

export interface ClassIcon {
  class: string;
  color: string;
  extraButton?: ExtraButton;
}

export interface ExtraButton {
  name: string;
  class: string;
  color: string;
}

// others

export interface ExtraButtonEmitter {
  extraButton: ExtraButton;
  option: DropdownOption;
}
