import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CropperImgBannerComponent } from './container/cropper-img-banner/cropper-img-banner.component';
import { BannerEditComponent } from './banner-edit.component';
import { DropZoneComponent } from './container/drop-zone/drop-zone.component';
import { ErrorFailedMessageComponent } from './container/error-failed-message/error-failed-message.component';
import { ProgressBarComponent } from './container/progress-bar/progress-bar.component';
/* 
  Components go here.
*/
const components = [
  BannerEditComponent,
  CropperImgBannerComponent,
  DropZoneComponent,
  ErrorFailedMessageComponent,
  ProgressBarComponent,
];
/* 
  Modules go here.
*/
const modules = [NgxSpinnerModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class BannerEditModule {}
