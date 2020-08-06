import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_ROUTING } from '../app.routes';

import { BannerTiendaComponent } from './banner-tienda/banner-tienda.component';
import { LoadingComponent } from './loading/loading.component';
import { CardShimmerComponent } from './card-shimmer/card-shimmer.component';
import { CardShimmerDetalleProductoComponent } from './card-shimmer-detalle-producto/card-shimmer-detalle-producto.component';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    BannerTiendaComponent,
    LoadingComponent,
    CardShimmerComponent,
    CardShimmerDetalleProductoComponent,
    TerminosCondicionesComponent,
    DetalleProductoComponent
  ],
  imports: [
    CommonModule,
    APP_ROUTING,

  ],
  exports: [
    BannerTiendaComponent,
    LoadingComponent,
    CardShimmerComponent,
    CardShimmerDetalleProductoComponent,
    TerminosCondicionesComponent,
    DetalleProductoComponent
  ]
})
export class ComponentsModule { }
