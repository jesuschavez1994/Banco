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

@NgModule({
    declarations: [
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

    ],
    imports: [
      APP_ROUTING, PipesModule,
      CommonModule
    ],
    exports: [
      NavbarComponent, NavbarToHomeComponent,
      CategoriasComponent, NavbarstoreComponent,
      SidebarMenuComponent, SidebarListComponent,
      BreadcrumbComponent, SidebarListButtonComponent,
      BannerComponent, ProductsCardsComponent,
      SearchBarComponent, ImagePreviewGalleryComponent,
      ProductDetailComponent, QuantityCounterComponent
    ]
})

export class SharedModule { }
