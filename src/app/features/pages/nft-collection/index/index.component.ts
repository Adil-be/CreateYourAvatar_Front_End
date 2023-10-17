import { Component, OnInit } from '@angular/core';
import { CollectionData } from 'src/app/core/interface/collection-data';
import { NftCollection } from 'src/app/core/interface/nft-collection';
import { NftCollectionService } from 'src/app/core/services/nft-collection.service';

type NftCollectionArray = {
  nftCollection: NftCollection;
  active: boolean;
};

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  public dataCollections: NftCollectionArray[] = [];

  public constructor(private NCService: NftCollectionService) {}

  ngOnInit(): void {
    this.NCService.getNftCollection().subscribe((data: CollectionData) => {
      this.dataCollections = data['hydra:member'].map((value, index) => {
        if (index == 0) {
          return { nftCollection: value, active: true };
        } else {
          return { nftCollection: value, active: false };
        }
      });

      console.log('collections ', this.dataCollections);
    });
  }

  handleClick(nftCollection: NftCollection) {
    this.dataCollections = this.dataCollections.map((value) => {
      return value.nftCollection == nftCollection
        ? { nftCollection: value.nftCollection, active: true }
        : { nftCollection: value.nftCollection, active: false };
    });
    console.log('dataCollections ', this.dataCollections);
  }
}
