import { Component, OnInit } from '@angular/core';
import { Nft } from 'src/app/core/interface/nft';
import { order } from 'src/app/core/interface/param-nft';
import { NftService } from 'src/app/core/services/nft.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public constructor(private nftService: NftService) {}
  public featuredNfts: Nft[] = [];

  ngOnInit() {
    let order: order = 'DESC'
    let option = {
      'featured': true,
      'order[purchaseDate]': order,
      // 'page': 1,
      itemsPerPage: 4,
    };

    this.nftService.getNftsWithModel(option).subscribe((data) => {
      this.featuredNfts = this.nftService.extractNfts(data);
    });
  }
}
