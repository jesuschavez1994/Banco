import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormAccountComponent } from './form-account/form-account.component';
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

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

// ALYLE //

import {
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';

/** Import Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig
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
import { AccountComponent } from './account/account.component';
import { ROUTING_VIEW_STORE } from './view.routes';
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

@NgModule({
    entryComponents: [
      MapEditarComponent,
      ContactDescriptionEditComponent,
      ModalAddCategoriasAndSubcategoriasComponent

    ],
    // tslint:disable-next-line: max-line-length
    declarations: [
      AccountComponent,
      DashboardComponent,
      ProductLoadComponent,
      FormAccountComponent,
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
      NoSynchronizedProductsComponent
      ],

    imports: [
      CommonModule,
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
      APP_ROUTING,
      ROUTING_VIEW_STORE,
      NzTimePickerModule,
      FormsModule,
      ReactiveFormsModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14'
      }),
      NgbModule
      ],

    exports: [
      PhotoUserEditComponent,
      PhotoUserComponent,
      CardShimmerFormConfigurationComponent,
      ModalAddCategoriasAndSubcategoriasComponent,
      NavbarSincronizacionComponent
    ],

    providers: [
      [ LyTheme2 ],
      [ StyleRenderer ],
      // Theme that will be applied to this module
      { provide: LY_THEME_NAME, useValue: 'minima-light' },
      { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
      { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
      // Gestures
      { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }
    ],

  })
  export class PrivateviewModule { }
