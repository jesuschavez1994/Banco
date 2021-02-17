import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SharedModule } from '../shared/shared.module'
import { ComponentsModule } from '../components/components.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ImageCropperModule } from 'ngx-image-cropper'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// ANGULAR MATERIAL //
import { MaterialModule } from '@Angula-Material/material.module'

// Mapa //
import { AgmCoreModule } from '@agm/core'

import { PhotoUserEditComponent } from './components/photo-user-edit/photo-user-edit.component'
import { PhotoUserComponent } from './components/photo-user/photo-user.component'

import { CardShimmerFormConfigurationComponent } from '@Cards-Shimmer/card-shimmer-form-configuration/card-shimmer-form-configuration.component'
import { CardShimmerPhotoUserEditComponent } from '@Cards-Shimmer/card-shimmer-photo-user-edit/card-shimmer-photo-user-edit.component'
import { ComponentsComponent } from './components/components.component'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker'
import { ProductLoadingComponent } from './product-loading/product-loading.component'

// PAGINATION //

import { NgxPaginationModule } from 'ngx-pagination' // <-- import the module

// ALYLE //

import { HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser'

/** Import Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig,
} from '@alyle/ui'

import { LyIconModule } from '@alyle/ui/icon'

/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button'
import { LyToolbarModule } from '@alyle/ui/toolbar'
import { LyImageCropperModule } from '@alyle/ui/image-cropper'

/** Import themes */
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima'
import { ProductLoadComponent } from './components/product-load/product-load/product-load.component'
import { ViewProductsLoadsComponent } from './components/view-products-loads/view-products-loads.component'
import { AccountComponent } from '../vistas-privadas/account/pages/settings/views/my-account/account.component'
import { ProductLoadingSmartComponent } from './product-loading/container/product-loading-smart/product-loading-smart.component'
import { LoadProductComponent } from './LoadProduct/load-product/load-product.component'
import { ModalAddCategoriasAndSubcategoriasComponent } from './product-loading/container/modals/modal-add-categorias-and-subcategorias/modal-add-categorias-and-subcategorias.component'
import { ModalDeleteProductComponent } from './components/view-products-loads/container/modal-delete-product/modal-delete-product.component'
import { SpreadSheetsModule } from '@grapecity/spread-sheets-angular'

// CARRUSEL //

import { EditProdutcComponent } from './components/edit-produtc/edit-produtc.component'
import { EditProductNoDisponibleComponent } from './components/edit-product-no-disponible/edit-product-no-disponible.component'
import { NgxSpinnerModule } from 'ngx-spinner'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { SettingsComponent } from './account/settings.component'
import { FormAccountUserComponent } from './AccountUser/pages/settings/views/form-account-user/form-account-user.component'
import { ViewFormAccountUserComponent } from './AccountUser/pages/view-form-account-user.component'
import { FooterButtonFormAccountComponent } from './AccountUser/pages/settings/views/components/footer-button-form-account/footer-button-form-account.component'

// Feature modlues
import { MyStoreModule } from './my-store/my-store.module'
import { AdminModule } from './Admin/admin.module'

import { VistasPrivadasRoutingModule } from './vistas-privadas-routing.module'
import { VistasPrivadasSharedModule } from './shared/vistas-privadas-shared.module'
import { SearchModule } from './sincronizacion/components/search/search.module'

/* 
  Components go here.
*/
const components = [
  // SettingsComponent,
  DashboardComponent,
  ProductLoadComponent,
  PhotoUserEditComponent,
  PhotoUserComponent,
  CardShimmerFormConfigurationComponent,
  CardShimmerPhotoUserEditComponent,
  ComponentsComponent,
  ProductLoadingComponent,
  ViewProductsLoadsComponent,
  ProductLoadingSmartComponent,
  LoadProductComponent,
  ModalAddCategoriasAndSubcategoriasComponent,
  ModalDeleteProductComponent,
  EditProdutcComponent,
  EditProductNoDisponibleComponent,
  FormAccountUserComponent,
  ViewFormAccountUserComponent,
  FooterButtonFormAccountComponent,
]
/* 
  Modules go here.
*/
const modules = [
  // AdminModule,
  MyStoreModule,
  VistasPrivadasRoutingModule,
  NgxDropzoneModule,
  SpreadSheetsModule,
  MaterialModule,
  NgxPaginationModule,
  SearchModule,
  SharedModule,
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
  NgbModule,
  NgxSpinnerModule,
  VistasPrivadasSharedModule,
  // MyStoreComponentsModule,
]
/* 
  If it's needed that this module exports modules/components, put them here.
*/
const exportStuff = [
  PhotoUserEditComponent,
  PhotoUserComponent,
  CardShimmerFormConfigurationComponent,
  ModalAddCategoriasAndSubcategoriasComponent,
]

@NgModule({
  entryComponents: [ModalAddCategoriasAndSubcategoriasComponent],
  declarations: [...components],
  imports: [
    ...modules,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14',
    }),
  ],
  exports: [...exportStuff],

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
