import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from '@services/service.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [],
  providers: [
  ],
  imports: [CommonModule, ServiceModule],
  exports: [],

})

export class PublicServices { }
