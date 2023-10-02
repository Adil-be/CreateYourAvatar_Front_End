import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { NftListComponent } from './user-galery/nft-list/nft-list.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserIdDialogComponent } from './dialogs/user-id-dialog/user-id-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { PictureDialogComponent } from './dialogs/picture-dialog/picture-dialog.component';
import { UserInfoDialogComponent } from './dialogs/user-info-dialog/user-info-dialog.component';
import { PasswordDialogComponent } from './dialogs/password-dialog/password-dialog.component';
import { UserGaleryComponent } from './user-galery/user-galery.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModifyNftComponent } from './Nft/modify-nft/modify-nft.component';
import { NftDetailComponent } from './Nft/detail/nft-detail.component';

@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent,
    ProfilComponent,
    UserIdDialogComponent,
    PictureDialogComponent,
    UserInfoDialogComponent,
    PasswordDialogComponent,
    UserGaleryComponent,
    NftListComponent,
    ModifyNftComponent,
    NftDetailComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
  ],
  bootstrap: [IndexComponent],
  providers: [],
})
export class AccountModule {}
