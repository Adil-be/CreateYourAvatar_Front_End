import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { NftListComponent } from './user-galery/nft-list/nft-list.component';


import { RouterModule } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserIdDialogComponent } from './dialogs/user-id-dialog/user-id-dialog.component';


import { PictureDialogComponent } from './dialogs/picture-dialog/picture-dialog.component';
import { UserInfoDialogComponent } from './dialogs/user-info-dialog/user-info-dialog.component';
import { PasswordDialogComponent } from './dialogs/password-dialog/password-dialog.component';
import { UserGaleryComponent } from './user-galery/user-galery.component';

import { ModifyNftComponent } from './Nft/modify-nft/modify-nft.component';
import { NftDetailComponent } from './Nft/detail/nft-detail.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReportComponent } from './report/report.component';

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
    ReportComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule

  ],
  bootstrap: [IndexComponent],
  providers: [],
})
export class AccountModule {}
