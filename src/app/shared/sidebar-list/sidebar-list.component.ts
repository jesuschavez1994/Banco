import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, HostListener, AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Profile, SidebarListOptions, AnchorsMenu  } from '@interfaces/components-options/sidebar-list.options.interface';



@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit, AfterViewInit {

  // Elements
  @ViewChild('sidebarList') sidebarList: ElementRef;
  @ViewChild('productsOptionMenu') productsOptionMenu: ElementRef;
  @ViewChild('contactoOptionMenu') contactoOptionMenu: ElementRef;

  // Inputs
  @Input() isExpanded = false;
  @Input() sidebarTarget: SidebarListComponent;
  @Input() anchorsMenu: AnchorsMenu;
  @Input() sidebarOptions: SidebarListOptions = {
    profile: {
      name: 'medicalback',
      instagram: {
        url: '',
        name: '@medicalbackground'
      },
      img: 'assets/img/no-image-banner.jpg',
      isVerified: true
    },
    categories: [
      {
        name: 'Medicamentos',
        routerLink: '',
        subcategories: [
          {
            name: 'Dolor & inflamación',
            routerLink: '',
          },
          {
            name: 'Belleza & Higiene',
            routerLink: '',
          },
          {
            name: 'Dieta & Fitness',
            routerLink: '',
          },
          {
            name: 'Salud y vitaminas',
            routerLink: '',
          },
          {
            name: 'Vida sexual',
            routerLink: '',
          },
          {
            name: 'Ortopedia',
            routerLink: '',
          },
          {
            name: 'Homeopatia & natural',
            routerLink: '',
          },
          {
            name: 'Mascotas & veterinaria',
            routerLink: '',
          }
        ]
      },
      {
        name: 'Medicamentos2',
        routerLink: '',
        subcategories: [
          {
            name: 'Dolor & inflamación2',
            routerLink: '',
          },
          {
            name: 'Belleza & Higiene2',
            routerLink: '',
          },
          {
            name: 'Dieta & Fitness2',
            routerLink: '',
          },
          {
            name: 'Salud y vitaminas2',
            routerLink: '',
          },
          {
            name: 'Vida sexual2',
            routerLink: '',
          },
          {
            name: 'Ortopedia2',
            routerLink: '',
          },
          {
            name: 'Homeopatia & natural2',
            routerLink: '',
          },
          {
            name: 'Mascotas & veterinaria2',
            routerLink: '',
          }
        ]
      },
    ]
  };

  // Outputs
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() selectedCategory = new EventEmitter<Category | any>();

  profile: Profile = this.sidebarOptions.profile;
  categories: Category[]  = this.sidebarOptions.categories;

  currentCategory: Category = this.categories[0];
  isSelectedCategory = false;

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void { }

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
    const idxRouteMatched = routes.indexOf(this.anchorsMenu.wordToMatch);

    if ( idxRouteMatched !== -1) {
      this.productsOptionMenu.nativeElement.classList.add('active');
    }else{
      this.contactoOptionMenu.nativeElement.classList.add('active');
    }

  }

  public selectCategory(category: Category) {

    if (category === this.currentCategory){
      this.isSelectedCategory = this.isSelectedCategory ? false : true;

    }else{
      this.isSelectedCategory = true;
    }

    this.currentCategory = category;

    this.selectedCategory.emit({
      currentCategory: this.currentCategory,
      isSelectedCategory: this.isSelectedCategory
    });
  }

}
