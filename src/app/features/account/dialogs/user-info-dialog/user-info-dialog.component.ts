import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface userInfoData {
  firstname: string;
  lastname: string;
  birthday: Date;
  gender: string;
  address: string;
}

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.css'],
})
export class UserInfoDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<UserInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userInfoData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
