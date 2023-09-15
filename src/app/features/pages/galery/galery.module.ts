import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleryComponent } from './galery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GaleryRoutingModule } from './galery-routing.module';

@NgModule({
  declarations: [GaleryComponent],
  imports: [CommonModule,SharedModule,GaleryRoutingModule],
  bootstrap: [GaleryComponent],
})
export class GaleryModule {}
