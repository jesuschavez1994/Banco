// Aquí Haremos el llamado de toda las importaciones de angular material //

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
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
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
