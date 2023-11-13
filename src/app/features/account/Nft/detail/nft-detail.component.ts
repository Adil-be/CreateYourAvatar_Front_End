import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NftService } from 'src/app/core/services/nft.service';
import { ModifyNftComponent } from '../modify-nft/modify-nft.component';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.css'],
})
export class NftDetailComponent implements OnInit {
  public nft: any;

  public constructor(
    private nftService: NftService,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    let nftModel;
    let user;

    const id = Number(this.route.snapshot.params['id']);
 
    this.nftService.getNftWithModel(id).subscribe((res) => {
      this.nft = res;
      console.log(this.nft)
    });
  }

  public openNftDialog() {
    console.log(this.nft.inSale)
    let dialogRef = this.matDialog.open(ModifyNftComponent, {
      data: {
        sellingPrice: this.nft.sellingPrice,
        inSale: this.nft.inSale,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data);
        this.nftService.patchNft(this.nft.id, data).subscribe((res) => {
          console.log(res);
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
}
