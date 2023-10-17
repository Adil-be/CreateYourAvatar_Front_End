import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatButtonModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
