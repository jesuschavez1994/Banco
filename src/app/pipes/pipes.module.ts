import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
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
  stringResponsive
} from './pipes.index';

/* 
  Pipes go here.
*/
const pipes = [
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
  stringResponsive
];


@NgModule({
  declarations: [...pipes],
  exports:  [...pipes],
  imports: [ CommonModule ]
})
export class PipesModule { }
