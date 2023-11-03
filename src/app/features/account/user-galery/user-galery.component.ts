import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ParamNft, order } from 'src/app/core/interface/param/param-nft';
import { User } from 'src/app/core/interface/model/user';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-user-galery',
  templateUrl: './user-galery.component.html',
  styleUrls: ['./user-galery.component.css'],
})
export class UserGaleryComponent implements OnInit, OnDestroy {
  private user!: User;
  test = true;
  filter = {
    modelName: null,
    description: null,
    inSale: null,
    featured: null,
    priceMin: null,
    priceMax: null,

    price: {
      check: null,
      order: 'asc',
    },
    purchase: {
      check: true,
      order: 'desc',
    },
  };
  optionUser!: ParamNft;

  options!: ParamNft;

  isOpen = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private auth: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.auth.getCurrentUser()?.subscribe((data) => {
      this.user = data;

      this.optionUser = {
        'user.id': this.user.id,
      };
      this.options = this.createOption();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public handleSubmit() {
    this.options = this.createOption();
  }

  public createOption(): ParamNft {
    let optionNft: ParamNft = {};
    if (this.filter.modelName)
      optionNft['nftModel.name'] = this.filter.modelName;
    if (this.filter.description)
      optionNft['nftModel.description'] = this.filter.description;
    if (this.filter.inSale) optionNft.inSale = this.filter.inSale;
    if (this.filter.featured) optionNft.featured = this.filter.featured;
    if (this.filter.priceMin)
      optionNft['sellingPrice[gt]'] = this.filter.priceMin;
    if (this.filter.priceMax)
      optionNft['sellingPrice[lt]'] = this.filter.priceMax;
    if (this.filter.price.check)
      optionNft['order[sellingPrice]'] = this.filter.price.order as order;
    if (this.filter.purchase.check)
      optionNft['order[purchaseDate]'] = this.filter.purchase.order as order;
    return Object.assign({}, optionNft, this.optionUser);
  }
}
