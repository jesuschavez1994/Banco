import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './avatar-default/imagen.pipe';
import { ProductoPipe } from './producto.pipe';
import { BoxDefaultPipe } from './box/box-default.pipe';
import { ImgProductLoadPipe } from './imagenLoad/img-product-load.pipe';
import { ExcerptPipe } from './excerpt/excerpt.pipe';
import { ImgFallbackPipe } from './img-fallback/img-fallback.pipe';
import { StrReplacePipe } from './strReplace/str-replace.pipe';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    ExcerptPipe,
    ImgFallbackPipe,
    StrReplacePipe,
    FilterPipe
  ],
  exports: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    ExcerptPipe,
    ImgFallbackPipe,
    StrReplacePipe,
    FilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
