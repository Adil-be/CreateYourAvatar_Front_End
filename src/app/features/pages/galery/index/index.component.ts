import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ParamNft, order } from 'src/app/core/interface/param-nft';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnDestroy {
  eventsSubject: Subject<void> = new Subject<void>();

  filter = {
    inSale: null,
    featured: null,
    priceMin: null,
    priceMax: null,

    price: {
      check: null,
      order: 'asc',
    },
    nftModel: {
      check: null,
      order: 'asc',
    },
  };

  optionNft: ParamNft = {};

  isOpen = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    console.log('mobileQuery ', this.mobileQuery.matches);

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public handleSubmit() {
    let optionNft: ParamNft = {};
    if (this.filter.inSale) optionNft.inSale = this.filter.inSale;
    if (this.filter.featured) optionNft.featured = this.filter.featured;
    if (this.filter.priceMin)
      optionNft['sellingPrice[gt]'] = this.filter.priceMin;
    if (this.filter.priceMax)
      optionNft['sellingPrice[lt]'] = this.filter.priceMax;
    if (this.filter.price.check)
      optionNft['order[sellingPrice]'] = this.filter.price.order as order;
    if (this.filter.nftModel.check)
      optionNft['order[nftModel.createdAt]'] = this.filter.nftModel
        .order as order;
    this.optionNft = optionNft;
  }
}
