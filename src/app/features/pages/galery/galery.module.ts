import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { GaleryRoutingModule } from './galery-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IndexComponent } from './index/index.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NftListComponent } from './nft-list/nft-list.component';

@NgModule({
  declarations: [NftListComponent, IndexComponent],
  imports: [
    CommonModule,
    SharedModule,
    GaleryRoutingModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    FormsModule,
    MatRadioModule,
    MatButtonModule,
  ],
  bootstrap: [IndexComponent],
})
export class GaleryModule {}
