import { Component, OnInit, Input } from '@angular/core';
import { NftService } from '../service/nft.service';
import { NftModelService } from '../service/nft-model.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.css'],
})
export class NftCardComponent implements OnInit {
  @Input() nft: any;

  public images: any[] = [];
  public firstImage: any;

  public constructor(
    private nftService: NftService,
    private nftModelService: NftModelService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.nft.nftModel);
    this.firstImage = this.nft.nftModel.nftImages[0];
  }
}
