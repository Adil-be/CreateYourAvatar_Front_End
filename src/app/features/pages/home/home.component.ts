import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Nft } from 'src/app/core/interface/nft';
import { NftData } from 'src/app/core/interface/nft-data';
import { order } from 'src/app/core/interface/param-nft';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { NftService } from 'src/app/core/services/nft.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public constructor(
    private nftService: NftService,
    private userService: UserService,
    private nftModelService: NftModelService
  ) {}
  public featuredNfts: Nft[] = [];
  public inProgress: boolean = true;

  ngOnInit() {
    let order: order = 'DESC';
    let option = {
      featured: true,
      'order[purchaseDate]': order,
      // 'page': 1,
      itemsPerPage: 4,
    };

    this.nftService.getAllNft(option).subscribe((data: NftData) => {
      let nfts: Nft[] = this.nftService.extractNfts(data);

      const observables = nfts.map((nft: Nft) => {
        let nftModel = nft.nftModel;
        let user = nft.user;
        return forkJoin([
          this.userService.getUser(user as string),
          this.nftModelService.getNftModelById(nftModel as string),
        ]);
      });
      forkJoin(observables).subscribe((results) => {
        results.forEach((result, index) => {
          const [user, model] = result;
          nfts[index].user = user;
          nfts[index].nftModel = model;
        });
        this.featuredNfts = nfts;
        this.inProgress = false;
        console.log('nfts ', this.featuredNfts);
      });
    });
  }
}
