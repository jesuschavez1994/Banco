import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ProductoPipe } from './producto.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ProductoPipe
  ],
  exports: [
    ImagenPipe,
    ProductoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
