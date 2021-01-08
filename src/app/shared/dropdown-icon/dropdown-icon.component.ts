import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DropdownMenu, ClassIcon } from '@interfaces/components-options/dropdown.options.interface';

@Component({
  selector: 'app-dropdown-icon',
  templateUrl: './dropdown-icon.component.html',
  styleUrls: ['./dropdown-icon.component.scss']
})
export class DropdownIconComponent implements OnInit, AfterViewInit {

  @ViewChild('dropdownCustom') dropdownCustom: ElementRef;
  @ViewChild('inputCheck') inputCheck: ElementRef;

  @Input() classIcon: ClassIcon = {
    class: 'fas fa-heart',
    color: '#F09207',
  };
  @Input() displayDropdown = 'left';
  @Input() menuOptions: DropdownMenu[];

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
