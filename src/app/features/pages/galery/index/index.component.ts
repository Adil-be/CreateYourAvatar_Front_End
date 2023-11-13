import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ParamModel, order } from 'src/app/core/interface/param/param-model';
import { Observable, Subject, map, mergeMap, switchMap } from 'rxjs';
import { NftCollectionService } from 'src/app/core/services/nft-collection.service';
import { NftCollection } from 'src/app/core/interface/model/nft-collection';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, OnDestroy {
  public nftcollections: any;

  filter = {
    modelName: null,
    description: null,
    inSale: null,
    featured: null,
    priceMin: null,
    priceMax: null,
    collectionId: null,

    price: {
      check: null,
      order: 'asc',
    },
    nftModel: {
      check: null,
      order: 'asc',
    },
  };

  optionNftModel: ParamModel = {};

  isOpen = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private nftCollectionService: NftCollectionService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 991px)');

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.nftcollections = this.nftCollectionService.getNftCollections().pipe(
      map((res) => {
        let nftCollections = res['hydra:member'];
        return nftCollections;
      })
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public handleSubmit() {
    let optionNftModel: ParamModel = {};
    if (this.filter.modelName) optionNftModel['name'] = this.filter.modelName;
    if (this.filter.description)
      optionNftModel['description'] = this.filter.description;
    if (this.filter.featured) optionNftModel.featured = this.filter.featured;
    if (this.filter.collectionId)
      optionNftModel['nftCollection.id'] = Number(this.filter.collectionId);
    if (this.filter.priceMin)
      optionNftModel['initialPrice[gt]'] = this.filter.priceMin;
    if (this.filter.priceMax)
      optionNftModel['initialPrice[lt]'] = this.filter.priceMax;
    if (this.filter.price.check)
      optionNftModel['order[initialPrice]'] = this.filter.price.order as order;
    if (this.filter.nftModel.check)
      optionNftModel['order[createdAt]'] = this.filter.nftModel.order as order;
    this.optionNftModel = optionNftModel;
  }
}
