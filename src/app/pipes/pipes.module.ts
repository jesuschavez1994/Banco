import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './avatar-default/imagen.pipe';
import { ProductoPipe } from './producto.pipe';
import { BoxDefaultPipe } from './box/box-default.pipe';
import { ImgProductLoadPipe } from './imagenLoad/img-product-load.pipe';
import { CapitalizadoPipe } from './capitalizado/capitalizado.pipe';
import { LimitarTextoPipe } from './limitar-texto/limitar-texto.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    CapitalizadoPipe,
    LimitarTextoPipe
  ],
  exports: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    CapitalizadoPipe,
    LimitarTextoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
