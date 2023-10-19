import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Nft } from 'src/app/core/interface/nft';
import { NftCollection } from 'src/app/core/interface/nft-collection';
import { NftModel } from 'src/app/core/interface/nft-model';
import { User } from 'src/app/core/interface/user';
import { NftService } from 'src/app/core/services/nft.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.css'],
})
export class NftCardComponent implements OnInit, OnChanges {
  @Input() nft!: Nft;
  nftModel!: NftModel;
  nftCollection!: NftCollection;

  public images: any[] = [];

  ngOnInit(): void {
    this.nftModel = this.nft.nftModel as NftModel;
    this.nftCollection = this.nftModel.nftCollection as NftCollection;
    // this.user = this.nft.user as User;
  }

  get image() {
    let model = this.nftModel as NftModel;
    return model.nftImages ? model.nftImages[0] : false;
  }

  ngOnChanges() {}
}
