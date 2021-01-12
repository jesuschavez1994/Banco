// Aquí Haremos el llamado de toda las importaciones de angular material //

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

const modules = [
  CommonModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatRadioModule,
];
@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
