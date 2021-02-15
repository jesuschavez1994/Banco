import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../../../shared/vistas-privadas-shared.module';

import { DragDropZoneFileComponent } from './container/drag-drop-zone-file/drag-drop-zone-file.component';
import { ExportarListaExcelComponent } from './exportar-lista-excel.component';
import { ProgessBarFileExcelComponent } from './container/progess-bar-file-excel/progess-bar-file-excel.component';
import { SizeFileComponent } from './container/size-file/size-file.component';
import { TableComponent } from './container/table/table.component';
/* 
  Components go here.
*/
const components = [
  DragDropZoneFileComponent,
  ExportarListaExcelComponent,
  ProgessBarFileExcelComponent,
  SizeFileComponent,
  TableComponent,
];
/* 
  Modules go here.
*/
const modules = [SharedModule, VistasPrivadasSharedModule];
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = [];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class ExportarListaExcelModule {}
