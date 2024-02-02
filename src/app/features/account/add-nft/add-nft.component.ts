import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Nft, PartialNft } from 'src/app/core/interface/model/nft';
import { NftModel } from 'src/app/core/interface/model/nft-model';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { NftValueService } from 'src/app/core/services/nft-value.service';
import { NftService } from 'src/app/core/services/nft.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-add-nft',
  templateUrl: './add-nft.component.html',
  styleUrls: ['./add-nft.component.css'],
})
export class AddNftComponent {
  loading: boolean = false;

  constructor(
    private nftService: NftService,
    private nftModelService: NftModelService,
    private auth: AuthService,
    private nftValueService: NftValueService,
    private _snackBar: MatSnackBar
  ) {}

  handleSubmit(partialNft: PartialNft) {
    this.loading = true;
    const model = partialNft.nftModel as NftModel;
    const valueRoute = model.nftValues.slice(-1)[0] as string;

    const user = this.auth.getCurrentUser()!;
    const nftValue = this.nftValueService.getNftValue(valueRoute);

    forkJoin([user, nftValue]).subscribe((res) => {
      const date = new Date();

      let value = res[1].value;
      let user = res[0];
      const routeUser = '/api/user_auth/' + user.id;
      const routeModel = '/api/nft_models/' + model.id;
      const nft: Nft = {
        token: partialNft.token!,
        featured: false,
        sellingPrice: value,
        inSale: partialNft.inSale!,
        nftModel: routeModel,
        buyingPrice: value,
        purchaseDate: date,
        user: routeUser,
      };

      console.log(nft);
      this.nftService
        .postNft(nft)
        .pipe(
          catchError((error) => {
            this.loading = false;
            this.openSnackBar('Something went wrong!!', 'danger');
            return error;
          })
        )
        .subscribe((res) => {
          console.log('res ', res);
          this.loading = false;
          this.openSnackBar('NFT successfuly Added !!', 'success');
        });
    });
  }
  openSnackBar(message: string, classeName: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: { message: message, classeName: classeName },
    });
  }
}
