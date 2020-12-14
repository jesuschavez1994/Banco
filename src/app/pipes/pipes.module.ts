import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './avatar-default/imagen.pipe';
import { ProductoPipe } from './producto.pipe';
import { BoxDefaultPipe } from './box/box-default.pipe';
import { ImgProductLoadPipe } from './imagenLoad/img-product-load.pipe';
import { CapitalizadoPipe } from './capitalizado/capitalizado.pipe';
import { LimitarTextoPipe } from './limitar-texto/limitar-texto.pipe';
import { LimitarNameProductoPipe } from './limitar-name-producto/limitar-name-producto.pipe';
import { PreviewGalleryPipe } from './preview-gallery/preview-gallery.pipe';
import {EditProductPipe} from './edir-product/edit-produt.pipe';
import { SeacrhPipe } from './search/seacrh.pipe';
@NgModule({
  declarations: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    CapitalizadoPipe,
    LimitarTextoPipe,
    LimitarNameProductoPipe,
    PreviewGalleryPipe,
    EditProductPipe,
    SeacrhPipe
  ],
  exports: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe,
    CapitalizadoPipe,
    LimitarTextoPipe,
    LimitarNameProductoPipe,
    PreviewGalleryPipe,
    EditProductPipe,
    SeacrhPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
