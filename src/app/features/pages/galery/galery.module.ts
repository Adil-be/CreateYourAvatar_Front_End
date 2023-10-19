import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { GaleryRoutingModule } from './galery-routing.module';

import { IndexComponent } from './index/index.component';

import { FormsModule } from '@angular/forms';

import { NftListComponent } from './nft-list/nft-list.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [NftListComponent, IndexComponent],
  imports: [
    CommonModule,
    SharedModule,
    GaleryRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  bootstrap: [IndexComponent],
})
export class GaleryModule {}
