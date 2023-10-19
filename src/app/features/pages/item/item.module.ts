import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule,RouterModule, SharedModule,MaterialModule],
  bootstrap: [ItemComponent],
})
export class ItemModule {}
