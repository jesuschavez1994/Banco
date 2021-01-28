import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { APP_ROUTING } from '../app.routes';
import { NavbarToHomeComponent } from './navbar-to-home/navbar-to-home.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NavbarstoreComponent } from './header/navbarstore.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidebarListButtonComponent } from './sidebar-list-button/sidebar-list-button.component';
import { BannerComponent } from './banner/banner.component';
import { ProductsCardsComponent } from './products-cards/products-cards.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ImagePreviewGalleryComponent } from './image-preview-gallery/image-preview-gallery.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { QuantityCounterComponent } from './quantity-counter/quantity-counter.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { CheckInternetConnectionComponent } from './check-internet-connection/check-internet-connection.component';
import { PublicNavbarComponent } from './public-navbar/public-navbar.component';
import { NavBrandComponent } from './public-navbar/nav-brand/nav-brand.component';
import { CategoryLinkComponent } from './public-navbar/category-link/category-link.component';
import { ButtonShopComponent } from './public-navbar/button-shop/button-shop.component';
import { ButtonUserSettingsComponent } from './public-navbar/button-user-settings/button-user-settings.component';
import { ButtonSignInComponent } from './public-navbar/button-sign-in/button-sign-in.component';
import { ButtonLoginComponent } from './public-navbar/button-login/button-login.component';
import { AvatarComponent } from './public-navbar/avatar/avatar.component';
import { NavOptionsComponent } from './public-navbar/nav-options/nav-options.component';
import { SearchComponent } from './public-navbar/search/search.component';
import { SidebarHomeComponent } from './sidebar-home/sidebar-home.component';
import { SliderComponent } from './slider/slider.component';
import { ModalErrComponent } from './modal-err/modal-err.component';
import { ModalRegisterComponent } from './modal-register/modal-register.component';
import { MaterialModule } from '../Angula-Material/material.module';
 
const components = [
  NavbarComponent,
  NavbarToHomeComponent,
  CategoriasComponent,
  NavbarstoreComponent,
  SidebarMenuComponent,
  SidebarListComponent,
  BreadcrumbComponent,
  SidebarListButtonComponent,
  BannerComponent,
  ProductsCardsComponent,
  SearchBarComponent,
  ImagePreviewGalleryComponent,
  ProductDetailComponent,
  QuantityCounterComponent,
  SpinnerComponent,
  CheckInternetConnectionComponent,
  PublicNavbarComponent,
  NavBrandComponent,
  CategoryLinkComponent,
  ButtonShopComponent,
  ButtonUserSettingsComponent,
  ButtonSignInComponent,
  ButtonLoginComponent,
  AvatarComponent,
  NavOptionsComponent,
  SearchComponent,
  SidebarHomeComponent,
  SliderComponent,
  ModalErrComponent,
  ModalRegisterComponent,
 
];

const modules = [
  RouterModule,
  PipesModule,
  CommonModule,
  NgxPaginationModule,
  CommonModule,
  MaterialModule,
];

@NgModule({

  entryComponents:[
    ModalErrComponent,
    ModalRegisterComponent
  ],
  declarations: [...components],
  imports: [
    // APP_ROUTING,
    ...modules,
  ],
  exports: [...components, ...modules],
})
export class SharedModule {}
