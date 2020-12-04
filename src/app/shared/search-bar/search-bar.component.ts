import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() buttonSidebarList = false;
  @Input() isExpanded = false;
  @Output() sidebarExpand = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );

  }

}
