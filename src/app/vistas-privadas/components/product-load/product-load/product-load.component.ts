import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LyImageCropper, ImgCropperConfig } from '@alyle/ui/image-cropper';
import { StyleRenderer, lyl } from '@alyle/ui';
import 'hammerjs';

import { ThemeVariables, keyframesUniqueId, ThemeRef } from '@alyle/ui';
import { STYLES as STYLES_BUTTON } from '@alyle/ui/button';



const STYLES = (theme: ThemeVariables, ref: ThemeRef) => {
  // Make sure button styles have been rendered
  ref.renderStyleSheet(STYLES_BUTTON);
  // Get selectors
  const button = ref.selectorsOf(STYLES_BUTTON);
  const circularRotate = keyframesUniqueId.next();
  const { after } = theme;

  return {
    $global: lyl `{
      @keyframes ${circularRotate} {
        0% {
          transform-origin: 50% 50%
        }
        100% {
          transform: rotate(360deg)
        }
      }
    }`,
    root: lyl `{
      ${button.root} {
        margin-${after}: 1em
      }
    }`,
    spinner: lyl `{
      position: absolute
      width: 24px
      height: 24px
      animation: ${circularRotate} 1.4s linear infinite
    }`,
    spinnerCircle: lyl `{
      color: ${theme.disabled.contrast}
      stroke-dasharray: 80px, 200px
      stroke-dashoffset: 0px
      stroke: currentColor
    }`
  };
};

const styles = () => {
  return {
    actions: lyl `{
      display: flex
    }`,
    cropper: lyl `{
      max-width: 400px
      height: 300px
    }`,
    flex: lyl `{
      flex: 1
    }`
  };
};

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

  readonly styles = this.sRenderer.renderSheet(STYLES, true);

  loading1 = false;
  loading2 = false;
  loading3 = false;
  ImgURL: any[] = [];
  NoBox = true;

  BoxDefault: any[] = [
    {
      box: '../../../../../assets/img/Caja de Producto default/Caja 1000x1000_Mesa de trabajo 1 copia.svg'
    },
    {
      box: '../../../../../assets/img/Caja de Producto default/Caja 1000x1000_Mesa de trabajo 1 copia.svg'
    },
    {
      box: '../../../../../assets/img/Caja de Producto default/Caja 1000x1000_Mesa de trabajo 1 copia.svg'
    },
    {
      box: '../../../../../assets/img/Caja de Producto default/Caja 1000x1000_Mesa de trabajo 1 copia.svg'
    }
  ];



  classes = this.sRenderer.renderSheet(styles);
  croppedImage?: string;
  ready: boolean;
  @ViewChild(LyImageCropper, { static: true }) readonly cropper: LyImageCropper;
  result: string;
  myConfig: ImgCropperConfig = {
    width: 250, // Default `250`
    height: 250, // Default `200`,
    output: {
      width: 60,
      height: 60
    }
  };

  onCropped(e) {
    this.croppedImage = e.dataURL;
    console.log(e);
    // this.ImgURL.splice(index, 0, this.croppedImage);
    console.log(this.ImgURL);
    return this.ImgURL;
  }

  addProduct(index){
    console.log(index);
    return index;
    // tslint:disable-next-line: prefer-for-of
    // for ( let i = 0; i < this.ImgURL.length; i++){

    //   if ( index === this.ImgURL){
    //     this.NoBox = false;
    //   }

    // }

  }

  // tslint:disable-next-line: variable-name
  constructor(readonly sRenderer: StyleRenderer, private _cd: ChangeDetectorRef) {
  }

  load(loading: string) {
    this[loading] = true;
    setTimeout(() => {
      this[loading] = false;
      this._cd.markForCheck();
    }, 2000);
  }

  ngOnInit(): void {
  }

}
