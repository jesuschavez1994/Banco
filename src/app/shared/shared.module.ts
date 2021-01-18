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
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditorComponent } from './order-editor/order-editor.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderPaymentFormsComponent } from './order-payment-forms/order-payment-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { DropdownIconComponent } from './dropdown-icon/dropdown-icon.component';
import { InvoiceBComponent } from './invoice-b/invoice-b.component';
import { ComponentsModule } from '../components/components.module';

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
      OrderListComponent,
      OrderEditorComponent,
      InvoiceComponent,
      OrderPaymentFormsComponent,
      DropdownButtonComponent,
      DropdownIconComponent,
      InvoiceBComponent,
    ],
    imports: [
      // APP_ROUTING,
      RouterModule,
      PipesModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      ComponentsModule

    ],
    exports: [
      NavbarComponent, NavbarToHomeComponent,
      CategoriasComponent, NavbarstoreComponent,
      SidebarMenuComponent, SidebarListComponent,
      BreadcrumbComponent, SidebarListButtonComponent,
      BannerComponent, ProductsCardsComponent,
      SearchBarComponent, ImagePreviewGalleryComponent,
      ProductDetailComponent, QuantityCounterComponent,
      OrderListComponent, OrderEditorComponent,
      InvoiceComponent, OrderPaymentFormsComponent,
      DropdownButtonComponent, DropdownIconComponent,
      InvoiceBComponent,
    ]
})

export class SharedModule { }
