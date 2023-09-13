import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Nft } from 'src/app/interface/nft';
import { User } from 'src/app/interface/user';
import { NftService } from 'src/app/services/nft.service';

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

  public user: User | null = null;

  public ngOnInit(): void {
    this.auth.getCurrentUser()?.subscribe((res) => {
      this.user = res;
      console.log('user ', this.user);

      const nfts = this.user.nfts;

      if (nfts) {
        nfts.forEach((nft) => {
          this.nftService.getNfById(nft.id).subscribe((dataNft) => {
            this.latestNfts.push(dataNft);
            console.log(dataNft);
          });
        });
      }
    });
  }
}
