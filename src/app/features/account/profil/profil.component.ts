import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ResponseRegistration } from 'src/app/core/interface/ResponseRegistration';
import { User } from 'src/app/core/interface/model/user';
import {
  UserInfoDialogComponent,
  userInfoData,
} from '../dialogs/user-info-dialog/user-info-dialog.component';
import { UserIdDialogComponent } from '../dialogs/user-id-dialog/user-id-dialog.component';
import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { PictureDialogComponent } from '../dialogs/picture-dialog/picture-dialog.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private matDialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  public response: ResponseRegistration | null = null;

  public user!: User;

  ngOnInit() {
    this.auth.getCurrentUser()?.subscribe((data) => {
      this.user = data;
    });
  }
  public openPictureDialog() {
    let dialogRef = this.matDialog.open(PictureDialogComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data == true) {
        const url = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([`/${url}`]);
          });
      }
    });
  }

  public openPersonalInfo() {
    let dialogRef = this.matDialog.open(UserInfoDialogComponent, {
      data: {
        birthday: this.user.birthday,
        gender: this.user.gender,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
      },
    });
    dialogRef.afterClosed().subscribe((data: userInfoData) => {
      if (data) {
        this.userService.patchUser(this.user.id, data).subscribe((res) => {
          const url = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([`/${url}`]);
            });
        });
      }
    });
  }

  public openIdDialog() {
    let dialogRef = this.matDialog.open(UserIdDialogComponent, {
      data: { username: this.user.username },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res)
        this.userService.patchUser(this.user.id, res).subscribe(() => {
          const url = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([`/${url}`]);
            });
        });
    });
  }
  public openPasswordDialog() {
    this.matDialog.open(PasswordDialogComponent);
  }

  public onSubmit() {}
}
