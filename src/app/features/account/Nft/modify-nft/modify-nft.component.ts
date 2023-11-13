import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type nftModifyData = {
  sellingPrice: number;
  inSale: boolean;
};
@Component({
  selector: 'app-modify-nft',
  templateUrl: './modify-nft.component.html',
  styleUrls: ['./modify-nft.component.css'],
})
export class ModifyNftComponent {
  constructor(
    private dialogRef: MatDialogRef<ModifyNftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: nftModifyData
  ) {
    console.log(data.inSale);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
