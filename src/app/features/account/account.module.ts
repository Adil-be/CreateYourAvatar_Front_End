import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';

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

import { PictureDialogComponent } from './dialogs/picture-dialog/picture-dialog.component';
import { UserInfoDialogComponent } from './dialogs/user-info-dialog/user-info-dialog.component';
import { PasswordDialogComponent } from './dialogs/password-dialog/password-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent,
    ProfilComponent,
    UserIdDialogComponent,
    PictureDialogComponent,
    UserInfoDialogComponent,
    PasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  bootstrap: [IndexComponent],
  providers: [],
})
export class AccountModule {}
