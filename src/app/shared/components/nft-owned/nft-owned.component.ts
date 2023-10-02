import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nft-owned',
  templateUrl: './nft-owned.component.html',
  styleUrls: ['./nft-owned.component.css'],
})
export class NftOwnedComponent {
  @Input() nft: any;

  public images: any[] = [];
  public firstImage: any;

  public constructor() {}

  ngOnInit(): void {
    this.firstImage = this.nft.nftModel.nftImages[0];
  }
}
