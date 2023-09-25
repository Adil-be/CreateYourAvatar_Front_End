import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ResponseRegistration } from 'src/app/core/interface/ResponseRegistration';
import { User } from 'src/app/core/interface/user';
import { UserInfoDialogComponent } from '../dialogs/user-info-dialog/user-info-dialog.component';
import { UserIdDialogComponent } from '../dialogs/user-id-dialog/user-id-dialog.component';
import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private matDialog: MatDialog,
    private userService: UserService
  ) {}

  public response: ResponseRegistration | null = null;

  public user!: User;

  ngOnInit() {
    this.auth.getCurrentUser()?.subscribe((data) => {
      this.user = data;
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
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.userService.patchUser(this.user.id, res).subscribe((res) => {
        console.log(res);
      });
    });
  }

  public openIdDialog() {
    let dialogRef = this.matDialog.open(UserIdDialogComponent, {
      data: { username: this.user?.username, email: this.user?.email },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.userService.patchUser(this.user.id, res);
    });
  }
  public openPasswordDialog() {
    this.matDialog.open(PasswordDialogComponent);
  }

  public onSubmit() {}
}
