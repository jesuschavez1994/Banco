import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, HostListener
} from '@angular/core';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit {

  @Input() isExpanded = false;
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @ViewChild('sidebarList') sidebarList: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  public fixedSidebar( $event: Event){

    const sidebarList = this.sidebarList.nativeElement;
    const pxTopElement = sidebarList.offsetTop;
    const pxTopDocument = document.documentElement.scrollTop;

    if ( pxTopDocument > pxTopElement ) {
      sidebarList.classList.add( 'aside--fixed' );
    } else {
      sidebarList.classList.remove( 'aside--fixed' );
    }

  }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );

  }

}