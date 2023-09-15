import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.css'],
})
export class NftCardComponent implements OnInit {
  @Input() nft: any;

  public images: any[] = [];
  public firstImage: any;

  public constructor() {}

  ngOnInit(): void {
    this.firstImage = this.nft.nftModel.nftImages[0];
  }
}
