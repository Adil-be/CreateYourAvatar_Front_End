import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../user-id-dialog/user-id-dialog.component';
import { UserImageService } from 'src/app/core/services/user-image.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-picture-dialog',
  templateUrl: './picture-dialog.component.html',
  styleUrls: ['./picture-dialog.component.css'],
})
export class PictureDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PictureDialogComponent>,
    private userImageService: UserImageService,
    private localStorageService: LocalStorageService
  ) {}

  private file: File | null = null;

  public invalid = false;

  error: string = 'Somethig Bad happend';

  public onFileSelected(event: Event) {
    this.invalid = false;
    this.error = '';

    const target = event.target as HTMLInputElement;
    this.file = target.files![0];
  }

  public handleUpload() {
    if (this.file && this.verifTypeFile(this.file)) {
      const formData = new FormData();

      formData.append('file', this.file);

      let id = this.localStorageService.getUser()!.id;

      const upload$ = this.userImageService.postUserImage(id, formData);

      upload$.subscribe((res) => {
        this.dialogRef.close(true);
      });
    } else {
      this.invalid = true;

      if (this.file == null) this.error = 'this file is invalid';
      else if (!this.verifTypeFile(this.file))
        this.error = 'this file must be of type jpeg or png';
    }
  }

  private verifTypeFile(file: File): boolean {
    return file.type == 'image/jpeg' || file.type == 'image/png';
  }
  public onNoClick() {
    this.dialogRef.close();
  }
}
