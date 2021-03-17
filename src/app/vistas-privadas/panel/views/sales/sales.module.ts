import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';

import { SalesComponent } from './sales.component';

const modules = [CommonModule, SharedModule, SalesRoutingModule];

const components = [SalesComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class SalesModule {}
