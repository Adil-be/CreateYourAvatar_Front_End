import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NftCollection } from 'src/app/core/interface/model/nft-collection';
import { NftModel } from 'src/app/core/interface/model/nft-model';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.css'],
})
export class ModelCardComponent implements OnInit, OnChanges {
  @Input() nftModel!: NftModel;
  // nftModel!: NftModel;
  nftCollection!: NftCollection;

  public images: any[] = [];

  ngOnInit(): void {
    this.nftCollection = this.nftModel.nftCollection as NftCollection;
    // this.nftModel = this.nft.nftModel as NftModel;
    // this.user = this.nft.user as User;
  }

  get image() {
    let model = this.nftModel as NftModel;
    return model.nftImage ? model.nftImage : false;
  }

  ngOnChanges() {}
}
