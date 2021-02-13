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
import { CardShimmerComponent } from './card-shimmer/card-shimmer.component';
import { ToastComponent } from '../modals/toast/toast.component';
import { BannerShimmerComponent } from './banner-shimmer/banner-shimmer.component';
import { SidebarListShimmerComponent } from './sidebar-list-shimmer/sidebar-list-shimmer.component';
import { PublicNavbarComponent } from "./public-navbar/public-navbar.component";
import { SpinnerComponent} from './spinner/spinner/spinner.component';
import { CheckInternetConnectionComponent } from "./check-internet-connection/check-internet-connection.component";
import { SidebarHomeComponent } from "./sidebar-home/sidebar-home.component";
import { SliderComponent } from "./slider/slider.component";
import { NavOptionsComponent } from "./public-navbar/nav-options/nav-options.component";
import { CategoryLinkComponent } from "./public-navbar/category-link/category-link.component";
import { NavBrandComponent } from "./public-navbar/nav-brand/nav-brand.component";
import { AvatarComponent } from "./public-navbar/avatar/avatar.component";
import { ButtonShopComponent } from "./public-navbar/button-shop/button-shop.component";
import { ModalRegisterComponent } from "./modal-register/modal-register.component";
import { SearchComponent } from "./public-navbar/search/search.component";
import { BtnActionComponent } from './btn-action/btn-action.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { CropperImgPhotoAccountComponent } from './cropper-img-photo-account/cropper-img-photo-account.component';
import { MaterialModule } from '../Angula-Material/material.module';
import { DropzonePhotoComponent } from './cropper-img-photo-account/container/dropzone-photo/dropzone-photo.component';
import {PrivateviewModule} from '../vistas-privadas/privateview.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FooterCropperComponent } from './cropper-img-photo-account/container/footer-cropper/footer-cropper.component';
import { FileUpImgDropzonComponent } from './cropper-img-photo-account/container/file-up-img-dropzon/file-up-img-dropzon.component';


@NgModule({
    declarations: [
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
      InvoiceBComponent, CardShimmerComponent,
      ToastComponent, BannerShimmerComponent,
      SidebarListShimmerComponent, PublicNavbarComponent,
      SpinnerComponent, CheckInternetConnectionComponent,
      SidebarHomeComponent, SliderComponent,
      NavOptionsComponent, CategoryLinkComponent,
      NavBrandComponent, AvatarComponent,
      ButtonShopComponent, ModalRegisterComponent,
      ModalRegisterComponent, SearchComponent,
      BtnActionComponent, GoogleMapComponent,
      CropperImgPhotoAccountComponent, DropzonePhotoComponent, FooterCropperComponent, FileUpImgDropzonComponent,

    ],
    imports: [
      // APP_ROUTING,
      RouterModule,
      PipesModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      MaterialModule,
      ImageCropperModule
      
      // ComponentsModule

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
      InvoiceBComponent, CardShimmerComponent,
      ToastComponent, BannerShimmerComponent,
      SidebarListShimmerComponent, PublicNavbarComponent,
      SpinnerComponent, CheckInternetConnectionComponent,
      SidebarHomeComponent, SliderComponent,
      NavOptionsComponent, CategoryLinkComponent,
      NavBrandComponent, AvatarComponent,
      ButtonShopComponent, ModalRegisterComponent,
      ModalRegisterComponent, SearchComponent,
      CropperImgPhotoAccountComponent

    ]
})
export class SharedModule {}
