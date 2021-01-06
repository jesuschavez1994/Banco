import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DropdownMenu, TitleButton } from '@interfaces/components-options/dropdown.options.interface';

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss']
})
export class DropdownButtonComponent implements OnInit, AfterViewInit {

  @ViewChild('dropdownCustom') dropdownCustom: ElementRef;
  @ViewChild('inputCheck') inputCheck: ElementRef;

  @Input() titleButton: TitleButton = {
    title: 'titulo b',
    color: '#F09207',
  };
  @Input() displayDropdown = 'left';
  @Input() menuOptions: DropdownMenu[] = [
    {
      title: 'titulo',
      color: '',
      divider: false,
      typeEvent: 'aHref',
      eventValue: 'href',

    },
    {
      title: 'titulo2',
      typeEvent: 'routerLink',
      eventValue: ['routerlink']
    },
    {
      title: 'titulo3',
      typeEvent: 'none'
    },
  ];

  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', (e) => {

      const isClickInside = this.dropdownCustom.nativeElement.contains(e.target);

      if (!isClickInside) {
        this.inputCheck.nativeElement.checked = false;
      }

    });

  }

  public selectOption(option: DropdownMenu) {
    this.selected.emit(option);

    console.log('DropdownIconComponent');
    console.log(option);
  }

}
