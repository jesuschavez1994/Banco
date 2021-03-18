// Aquí Haremos el llamado de toda las importaciones de angular material //

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatMenuModule } from '@angular/material/menu';

import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  CommonModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatRadioModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatIconModule,
  CdkTableModule,
  MatMenuModule,
  MatProgressBarModule,
  MatBottomSheetModule,
  OverlayModule,
  MatTooltipModule,
];
@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
