import { NgModule } from '@angular/core';

import {
  ErrorStateMatcher,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatSelectModule, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class MaterialModule { }
