import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Modules is here */ 
import { PipesModule } from '../pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../Angula-Material/material.module';
import { ImageCropperModule } from 'ngx-image-cropper';

/* index is here */

import {
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
  CardShimmerComponent,
  ToastComponent,
  BannerShimmerComponent,
  SidebarListShimmerComponent,
  PublicNavbarComponent,
  SpinnerComponent,
  CheckInternetConnectionComponent,
  SidebarHomeComponent,
  SliderComponent,
  NavOptionsComponent,
  CategoryLinkComponent,
  NavBrandComponent,
  AvatarComponent,
  ButtonShopComponent,
  ModalRegisterComponent,
  SearchComponent,
  BtnActionComponent,
  GoogleMapComponent,
  CropperImgPhotoAccountComponent,
  DropzonePhotoComponent,
  FooterCropperComponent,
  FileUpImgDropzonComponent,
} from './shared.index';

/* 
  Components go here.
*/
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
  OrderListComponent,
  OrderEditorComponent,
  InvoiceComponent,
  OrderPaymentFormsComponent,
  DropdownButtonComponent,
  DropdownIconComponent,
  InvoiceBComponent,
  CardShimmerComponent,
  ToastComponent,
  BannerShimmerComponent,
  SidebarListShimmerComponent,
  PublicNavbarComponent,
  SpinnerComponent,
  CheckInternetConnectionComponent,
  SidebarHomeComponent,
  SliderComponent,
  NavOptionsComponent,
  CategoryLinkComponent,
  NavBrandComponent,
  AvatarComponent,
  ButtonShopComponent,
  ModalRegisterComponent,
  SearchComponent,
  BtnActionComponent,
  GoogleMapComponent,
  CropperImgPhotoAccountComponent,
  DropzonePhotoComponent,
  FooterCropperComponent,
  FileUpImgDropzonComponent,
];
/* 
  Modules go here.
*/
const modules = [
  RouterModule,
  PipesModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
  MaterialModule,
  ImageCropperModule,
  // ComponentsModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
