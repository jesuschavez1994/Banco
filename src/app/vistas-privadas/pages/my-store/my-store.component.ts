import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRoutesParams  } from '@interfaces/components-options/sidebar-list.options.interface';
import { StoreService } from '@services/store/store.service';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
import { StoreResponse, Bannerimage, Srcsize } from '@interfaces/store.interface';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';
import { SearchStore } from '@models/search/search-store.model';
import { SearchService } from '@services/Search/search.service';
import {SearchStoreComponent} from '../../sincronizacion/components/search/container/search-store/search-store.component';
import {
  Category, Profile, SidebarListOptions, AnchorsMenu,
  SelectedEmitter, Filter, PriceRange
} from '@interfaces/components-options/sidebar-list.options.interface';
import {HomeServiceService} from '../../../vistas-publicas/services/home-service.service';

import { AsideFiltrosComponent } from '../../shared/aside-filtros/aside-filtros.component';
import { DataProductDB, ProductosLoads } from '@interfaces/InterfaceProducto';
import { UserStoreService } from '../../../services/user-store/user-store.service';


@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.scss']
})
export class MyStoreComponent implements OnInit {

  expandSidebar = true;
  StoreName = '';
  BannerVerifiqued: any;
  VerifiquedSuccesfull =  false;
  Onerror = false;

  profile: Profile;
  anchorsMenu: AnchorsMenu;

  breadcrumb: BreadcrumbOptions[];
  categories: Category[] = [];
  MyProduct: DataProductDB[] = [];

  @ViewChild('sidebarList') sidebarList: AsideFiltrosComponent;

  userLog: boolean;
  storeLog: boolean | string;



  imgsBanners: Srcsize = {
      xl: 'assets/img/Banner/Banner1.svg',
      l: 'assets/img/Banner/Banner1.svg',
      m: 'assets/img/Banner/Banner1.svg',
      s: 'assets/img/Banner/Banner1.svg'
  };

  constructor(  private activateRoute: ActivatedRoute,
                private router: Router,
                public storeService: StoreService,
                private _searchService: SearchService,
                private homeService: HomeServiceService,
                private userStoreService: UserStoreService,
                
              ) {}

  ngOnInit() {
    
     this.userLog = this.homeService.islog();
     this.storeLog= this.homeService.storeActive();
    this.loadDataStore();
    this.VeriquedBanner();
   
   }

  ngAfterViewInit(){
  }

  // **** Verificamos si existe un Banner ****//
  VeriquedBanner(){
    this.userStoreService.getDataStore(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'))
      .subscribe( (resp: StoreResponse) => {
        console.log('Banner verifiqued', resp);

        if ( resp.banner_image.length === 0){
          this.BannerVerifiqued = this.imgsBanners;
        }else{
          this.BannerVerifiqued = resp.banner_image[0].src_size;
        }
        this.VerifiquedSuccesfull = true;
    }, error => {
      this.BannerVerifiqued = 'assets/img/no-image-banner.JPG';
      this.VerifiquedSuccesfull = true;
      this.Onerror = true;
    });
  }



  public setBreadcrumbOptions(idStore: string, storeResp: StoreResponse){
    this.breadcrumb = [
      {
        title: 'inicio',
        routerLink: ['/']
      },
      {
        title: 'farmacias',
        routerLink: [`/farmacias`]
      },

    ];

    this.breadcrumb[2] = {
      title: `${storeResp.name}`,
      routerLink: [`/business-detail/${idStore}`]
    };
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    console.log('toggle', event);
    this.expandSidebar = event;
  }

  // Store
  public loadDataStore(){
     this.storeService.getStoreById(localStorage.getItem('storeId')).subscribe( storeResp => {
      this.StoreName = storeResp.name;
      console.log('store', storeResp);
      this.setBreadcrumbOptions(localStorage.getItem('storeId'), storeResp);
      this.setSidebarOptions(storeResp);
    });
  }

// CATEGORIAS Y SUBCATEGORIAS DEL FILTRO //

public setSidebarOptions(storeResp: StoreResponse){

  this.anchorsMenu = {
    productLink: `/product-catalogue`,
    contactLink: `contact'`,
    wordToMatch: `products`,
    synchronizationLink: `/my-store/sincronizacion/exportar-lista-excel`,
  };

  this.profile = {
    name: storeResp.name,
    instagram: { // la base de datos no tiene el dato
      url: '',
      name: '@medicalbackground'
    },
    img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
    isVerified: storeResp.certification == 'true' ? true : false
  };

  this.categories = [
    {
      id: 1,
      name: 'Cosmeticos',

      subcategories: [
        {
          id: 1,
          name: 'Dolor inflamación',

        },
        {
          id: 2,
          name: 'Belleza Higiene',

        },
        {
          id: 3,
          name: 'Dieta & Fitness',

        },
        {
          id: 4,
          name: 'Salud y vitaminas',

        },
        {
          id: 5,
          name: 'Vida sexual',

        },
        {
          id: 6,
          name: 'Ortopedia',

        },
        {
          id: 7,
          name: 'Homeopatia & natural',

        },
        {
          id: 8,
          name: 'Mascotas & veterinaria',

        }
      ]
    },
    {
      id: 2,
      name: 'Medicamentos2',

      subcategories: [
        {
          id: 1,
          name: 'Dolor & inflamación2',

        },
        {
          id: 2,
          name: 'Belleza & Higiene2',

        },
        {
          id: 3,
          name: 'Dieta & Fitness2',

        },
        {
          id: 4,
          name: 'Salud y vitaminas2',

        },
        {
          id: 5,
          name: 'Vida sexual2',

        },
        {
          id: 6,
          name: 'Ortopedia2',

        },
        {
          id: 7,
          name: 'Homeopatia & natural2',

        },
        {
          id: 8,
          name: 'Mascotas & veterinaria2',

        }
      ]
    },
  ];
}

}
