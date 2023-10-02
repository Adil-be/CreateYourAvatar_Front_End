import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  email?: string;
  username: string;
}
@Component({
  selector: 'app-user-id-dialog',
  templateUrl: './user-id-dialog.component.html',
  styleUrls: ['./user-id-dialog.component.css'],
})
export class UserIdDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserIdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onNoClick() {
    this.dialogRef.close();
  }
}
