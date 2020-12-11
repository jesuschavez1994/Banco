import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './avatar-default/imagen.pipe';
import { ProductoPipe } from './producto.pipe';
import { BoxDefaultPipe } from './box/box-default.pipe';
import { ImgProductLoadPipe } from './imagenLoad/img-product-load.pipe';
import { ExcerptPipe } from './excerpt/excerpt.pipe';
import { ImgFallbackPipe } from './img-fallback/img-fallback.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    ExcerptPipe,
    ImgFallbackPipe
  ],
  exports: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    ExcerptPipe,
    ImgFallbackPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
