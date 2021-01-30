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
import { ExcludeMacthesPipe } from './excludeMacthes/exclude-macthes.pipe';
import { CapitalizadoPipe } from './capitalizado/capitalizado.pipe';
import { LimitarTextoPipe } from './limitar-texto/limitar-texto.pipe';
import { LimitarNameProductoPipe } from './limitar-name-producto/limitar-name-producto.pipe';
import { PreviewGalleryPipe } from './preview-gallery/preview-gallery.pipe';
import {EditProductPipe} from './edir-product/edit-produt.pipe';
import { SeacrhPipe } from './search/seacrh.pipe';
import { stringResponsive } from "./pipeResponsive/stringResponsive.pipe";



@NgModule({
  declarations: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    ExcerptPipe,
    ImgFallbackPipe,
    StrReplacePipe,
    FilterPipe,
    ExcludeMacthesPipe,
    CapitalizadoPipe,
    LimitarTextoPipe,
    LimitarNameProductoPipe,
    PreviewGalleryPipe,
    EditProductPipe,
    SeacrhPipe,
    stringResponsive,
  ],
  exports: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    ExcerptPipe,
    ImgFallbackPipe,
    StrReplacePipe,
    FilterPipe,
    ExcludeMacthesPipe,
    CapitalizadoPipe,
    LimitarTextoPipe,
    LimitarNameProductoPipe,
    PreviewGalleryPipe,
    EditProductPipe,
    SeacrhPipe,
    stringResponsive,
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
