import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { ComponentsModule } from '../components/components.module';
import { APP_ROUTING } from '../app.routes';
import { ContactInformationEditComponent } from './components/contact-information-edit/contact-information-edit.component';
import { ContactInformationComponent } from './components/contact-information/contact-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapEditarComponent } from './components/map-editar/map-editar.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PipesModule } from '@pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ANGULAR MATERIAL //
import { MaterialModule } from '@Angula-Material/material.module';

// Mapa //
import { AgmCoreModule } from '@agm/core';

import { ContactDescriptionEditComponent } from './components/contact-description-edit/contact-description-edit.component';
import { ContactDescriptionComponent } from './components/contact-description/contact-description.component';
import { AsideComponent } from './shared/aside/aside.component';
import { PhotoUserEditComponent } from './components/photo-user-edit/photo-user-edit.component';
import { PhotoUserComponent } from './components/photo-user/photo-user.component';

import { CardShimmerFormConfigurationComponent } from '@Cards-Shimmer/card-shimmer-form-configuration/card-shimmer-form-configuration.component';
import { CardShimmerPhotoUserEditComponent } from '@Cards-Shimmer/card-shimmer-photo-user-edit/card-shimmer-photo-user-edit.component';
import { CardShimmerTableInformacionComponent } from '@Cards-Shimmer/card-shimmer-table-informacion/card-shimmer-table-informacion.component';
import { CardShimmerTitleStoreComponent } from '@Cards-Shimmer/card-shimmer-title-store/card-shimmer-title-store.component';
import { ScheduleStoreComponent } from './components/schedule-store/schedule-store.component';
import { ComponentsComponent } from './components/components.component';
import { SheduleStoreEditComponent } from './components/shedule-store-edit/shedule-store-edit.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { ProductLoadingComponent } from './product-loading/product-loading.component';
import { MyStoreComponent } from './pages/my-store/my-store.component';

// PAGINATION //

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

// ALYLE //

import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';

/** Import Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig,
} from '@alyle/ui';

import { LyIconModule } from '@alyle/ui/icon';

/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';

/** Import themes */
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { ProductLoadComponent } from './components/product-load/product-load/product-load.component';
import { ViewProductsLoadsComponent } from './components/view-products-loads/view-products-loads.component';
import { AccountComponent } from '../vistas-privadas/account/pages/settings/views/my-account/account.component';
import { ProductLoadingSmartComponent } from './product-loading/container/product-loading-smart/product-loading-smart.component';
import { LoadProductComponent } from './LoadProduct/load-product/load-product.component';
import { ModalAddCategoriasAndSubcategoriasComponent } from './product-loading/container/modals/modal-add-categorias-and-subcategorias/modal-add-categorias-and-subcategorias.component';
// tslint:disable-next-line: max-line-length
import { ModalDeleteProductComponent } from './components/view-products-loads/container/modal-delete-product/modal-delete-product.component';
import { NavbarSincronizacionComponent } from './shared/navbar-sincronizacion/navbar-sincronizacion.component';
import { ExportarListaExcelComponent } from './sincronizacion/pages/exportar-lista-excel/exportar-lista-excel.component';
import { SuggestedProductsComponent } from './sincronizacion/pages/suggested-products/suggested-products.component';
import { SincronizacionViewsComponent } from './sincronizacion/components/sincronizacion-views/sincronizacion-views.component';
import { ItemsSuggestedProductsComponent } from './sincronizacion/pages/suggested-products/container/items-suggested-products/items-suggested-products.component';
import { NoSuggestedProductsComponent } from './sincronizacion/pages/suggested-products/container/no-suggested-products/no-suggested-products.component';
import { SynchronizedProductsComponent } from './sincronizacion/pages/synchronized-products/synchronized-products.component';
import { NoSynchronizedProductsComponent } from './sincronizacion/pages/synchronized-products/container/no-synchronized-products/no-synchronized-products.component';
import { SpreadSheetsModule } from '@grapecity/spread-sheets-angular';
import { TableComponent } from './sincronizacion/pages/exportar-lista-excel/container/table/table.component';
import { SynchronizedProductsTableComponent } from './sincronizacion/pages/synchronized-products/container/synchronized-products-table/synchronized-products-table.component';
import { DialogSynchronizedComponent } from './sincronizacion/pages/synchronized-products/container/dialog-synchronized/dialog-synchronized.component';
import { TableroDeSincronizacionComponent } from './sincronizacion/pages/synchronized-products/container/tablero-de-sincronizacion/tablero-de-sincronizacion.component';
import { BankProductComponent } from './sincronizacion/pages/bank-product/bank-product.component';
import { ItemListProductComponent } from './sincronizacion/pages/bank-product/container/item-list-product/item-list-product.component';

// CARRUSEL //

import { LoadBanckProductComponent } from './Admin/pages/load-banck-product/load-banck-product.component';
import { FormBanckProductAdminComponent } from './Admin/pages/load-banck-product/container/form-banck-product-admin/form-banck-product-admin.component';
import { FormBanckProductSyncComponent } from './sincronizacion/components/form-banck-product-sync/form-banck-product-sync.component';
import { EditProdutcComponent } from './components/edit-produtc/edit-produtc.component';
import { EditSincronizacionComponent } from './sincronizacion/components/edit-sincronizacion/edit-sincronizacion.component';
import { EditProductNoDisponibleComponent } from './components/edit-product-no-disponible/edit-product-no-disponible.component';
import { SearchComponent } from './sincronizacion/components/search/search.component';
import { DesincronizarComponent } from './sincronizacion/components/desincronizar/desincronizar.component';
import { AsideFiltrosComponent } from './shared/aside-filtros/aside-filtros.component';
import { CarouselSuggestedComponent } from './sincronizacion/pages/suggested-products/container/carousel-suggested/carousel-suggested.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from '../app-routing.module';
import { CatalogoBankProductComponent } from './Admin/pages/container/catalogo-bank-product/catalogo-bank-product.component';
import { EditProductBankComponent } from './Admin/pages/container/edit-product-bank/edit-product-bank.component';
import { ProductsCardsStoreComponent } from './shared/products-cards-store/products-cards-store/products-cards-store.component';
import { SearchStoreComponent } from './sincronizacion/components/search/container/search-store/search-store.component';
import { BannerEditComponent } from './shared/banner-edit/banner-edit.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CropperImgBannerComponent } from './shared/banner-edit/container/cropper-img-banner/cropper-img-banner.component';
import { ErrorFailedMessageComponent } from './shared/banner-edit/container/error-failed-message/error-failed-message.component';
import { ProgressBarComponent } from './shared/banner-edit/container/progress-bar/progress-bar.component';
import { DropZoneComponent } from './shared/banner-edit/container/drop-zone/drop-zone.component';
import { DragDropZoneFileComponent } from './sincronizacion/pages/exportar-lista-excel/container/drag-drop-zone-file/drag-drop-zone-file.component';
import { SizeFileComponent } from './sincronizacion/pages/exportar-lista-excel/container/size-file/size-file.component';
import { ProgessBarFileExcelComponent } from './sincronizacion/pages/exportar-lista-excel/container/progess-bar-file-excel/progess-bar-file-excel.component';
import { SettingsComponent } from './account/settings.component';
import { FormAccountUserComponent } from './AccountUser/pages/settings/views/form-account-user/form-account-user.component';
import { ViewFormAccountUserComponent } from './AccountUser/pages/view-form-account-user.component';
import { FooterButtonFormAccountComponent } from './AccountUser/pages/settings/views/components/footer-button-form-account/footer-button-form-account.component';

@NgModule({
  entryComponents: [
    MapEditarComponent,
    ContactDescriptionEditComponent,
    ModalAddCategoriasAndSubcategoriasComponent,
  ],
  // tslint:disable-next-line: max-line-length
  declarations: [
    AccountComponent,
    DashboardComponent,
    ProductLoadComponent,
    ContactComponent,
    ContactInformationEditComponent,
    ContactInformationComponent,
    MapaComponent,
    MapEditarComponent,
    ContactDescriptionEditComponent,
    ContactDescriptionComponent,
    AsideComponent,
    PhotoUserEditComponent,
    PhotoUserComponent,
    CardShimmerFormConfigurationComponent,
    CardShimmerPhotoUserEditComponent,
    CardShimmerTableInformacionComponent,
    CardShimmerTitleStoreComponent,
    ScheduleStoreComponent,
    ComponentsComponent,
    SheduleStoreEditComponent,
    ProductLoadingComponent,
    MyStoreComponent,
    ViewProductsLoadsComponent,
    ProductLoadingSmartComponent,
    LoadProductComponent,
    ModalAddCategoriasAndSubcategoriasComponent,
    ModalDeleteProductComponent,
    NavbarSincronizacionComponent,
    ExportarListaExcelComponent,
    SuggestedProductsComponent,
    SincronizacionViewsComponent,
    ItemsSuggestedProductsComponent,
    NoSuggestedProductsComponent,
    SynchronizedProductsComponent,
    NoSynchronizedProductsComponent,
    TableComponent,
    SynchronizedProductsTableComponent,
    DialogSynchronizedComponent,
    TableroDeSincronizacionComponent,
    BankProductComponent,
    ItemListProductComponent,
    LoadBanckProductComponent,
    FormBanckProductAdminComponent,
    FormBanckProductSyncComponent,
    EditProdutcComponent,
    EditSincronizacionComponent,
    EditProductNoDisponibleComponent,
    SearchComponent,
    DesincronizarComponent,
    AsideFiltrosComponent,
    CarouselSuggestedComponent,
    CatalogoBankProductComponent,
    EditProductBankComponent,
    ProductsCardsStoreComponent,
    SearchStoreComponent,
    BannerEditComponent,
    CropperImgBannerComponent,
    ErrorFailedMessageComponent,
    ProgressBarComponent,
    DropZoneComponent,
    DragDropZoneFileComponent,
    SizeFileComponent,
    ProgessBarFileExcelComponent,
    SettingsComponent,
    FormAccountUserComponent,
    ViewFormAccountUserComponent,
    FooterButtonFormAccountComponent,
  ],

  imports: [
    CommonModule,
    NgxDropzoneModule,
    AppRoutingModule,
    SpreadSheetsModule,
    MaterialModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    // MODULOS Alyle //
    LyButtonModule,
    LyToolbarModule,
    LyImageCropperModule,
    LyIconModule,
    // END MODULOS Alyle //
    HammerModule,
    ComponentsModule,
    NzTimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14',
    }),
    NgbModule,
    NgxSpinnerModule,
  ],

  exports: [
    PhotoUserEditComponent,
    SearchComponent,
    PhotoUserComponent,
    CardShimmerFormConfigurationComponent,
    ModalAddCategoriasAndSubcategoriasComponent,
    NavbarSincronizacionComponent,
    TableComponent,
    SynchronizedProductsTableComponent,
    TableroDeSincronizacionComponent,
    SearchStoreComponent,
    ProgressBarComponent
  ],

  providers: [
    [LyTheme2],
    [StyleRenderer],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
  ],
})
export class PrivateviewModule {}
