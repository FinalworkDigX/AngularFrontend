import { NgModule } from '@angular/core';

import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule, MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} },
  ]
})
export class MaterialModule { }
