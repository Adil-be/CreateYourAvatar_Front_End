import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Nft } from 'src/app/core/interface/nft';
import { User } from 'src/app/core/interface/user';
import { NftService } from 'src/app/core/services/nft.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public constructor(
    private auth: AuthService,
    private nftService: NftService
  ) {}
  public latestNfts: Nft[] = [];

  public user!: User ;

  public ngOnInit(): void {
    this.auth.getCurrentUser()?.subscribe((res) => {
      this.user = res;

      if (res) {
        this.nftService
          .getNftsWithModel({
            'user.id': res.id!,
            'order[purchaseDate]': 'DESC',
            // 'page': 1,
            'itemsPerPage': 4,
          })
          .subscribe((nfts) => {
            this.latestNfts = nfts;
          });
      }
    });
  }
}
