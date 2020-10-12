import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ProductoPipe } from './producto.pipe';
import { BoxDefaultPipe } from './box/box-default.pipe';
import { ImgProductLoadPipe } from './imagenLoad/img-product-load.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe
  ],
  exports: [
    ImagenPipe,
    ProductoPipe,
    BoxDefaultPipe,
    ImgProductLoadPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
