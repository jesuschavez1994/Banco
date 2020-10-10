import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LyImageCropper, ImgCropperConfig } from '@alyle/ui/image-cropper';
import { StyleRenderer, lyl } from '@alyle/ui';
import 'hammerjs';

import { ThemeVariables, keyframesUniqueId, ThemeRef } from '@alyle/ui';
import { STYLES as STYLES_BUTTON } from '@alyle/ui/button';


@Component({
  selector: 'app-product-load',
  templateUrl: './product-load.component.html',
  styleUrls: ['./product-load.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class ProductLoadComponent implements OnInit {

  ImgURL: any[] = [];
  NoBox = true;

  // tslint:disable-next-line: variable-name
  constructor(readonly sRenderer: StyleRenderer, private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

}
