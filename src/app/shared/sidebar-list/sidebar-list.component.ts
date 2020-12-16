import { ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, HostListener
} from '@angular/core';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit, AfterViewInit {

  @Input() anclaOptions = {
      productosLink: '/business-detail/1/products',
      contactoLink: '/business-detail/1'
  };

  @Input() sidebarTarget: SidebarListComponent;
  @Input() isExpanded = false;
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @ViewChild('sidebarList') sidebarList: ElementRef;
  @ViewChild('productsOptionMenu') productsOptionMenu: ElementRef;
  @ViewChild('contactoOptionMenu') contactoOptionMenu: ElementRef;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.routerLinkActive();
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

  public routerLinkActive(){

    this.productsOptionMenu.nativeElement.classList.remove('active');
    this.contactoOptionMenu.nativeElement.classList.remove('active');

    const routes = this.route.snapshot.url.map( url => url.path );
    const idxRouteMatched = routes.indexOf('products');

    if ( idxRouteMatched !== -1) {
      this.productsOptionMenu.nativeElement.classList.add('active');
    }else{
      this.contactoOptionMenu.nativeElement.classList.add('active');
    }

  }

}
