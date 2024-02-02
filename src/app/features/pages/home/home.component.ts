import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { ModelData } from 'src/app/core/interface/data/model-data';
import { Nft } from 'src/app/core/interface/model/nft';
import { NftData } from 'src/app/core/interface/data/nft-data';
import { NftModel } from 'src/app/core/interface/model/nft-model';
import { order } from 'src/app/core/interface/param/param-nft';
import { NftCollectionService } from 'src/app/core/services/nft-collection.service';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { NftService } from 'src/app/core/services/nft.service';
import { UserService } from 'src/app/core/services/user.service';
import { ParamPagination } from 'src/app/core/interface/param/param-pagination';
import { NftCollection } from 'src/app/core/interface/model/nft-collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public constructor(
    private nftModelService: NftModelService,
    private nftCollectionService: NftCollectionService
  ) {}
  public featuredNfts: NftModel[] = [];
  public inProgress: boolean = true;

  public nftCollections:NftCollection[]=[]

  private subscriptionNftModel: Subscription | null = null;
  private subscriptionCollection: Subscription | null = null;

  ngOnInit() {
    let order: order = 'DESC';
    let option = {
      featured: true,
      'order[createdAt]': order,
      // 'page': 1,
      itemsPerPage: 4,
    };

    this.subscriptionNftModel = this.nftModelService
      .getModels(option)
      .subscribe((data: ModelData) => {
        let nftModels: NftModel[] = this.nftModelService.extractNfts(data);

        const observables = nftModels.map((nftModel: NftModel) => {
          let collection = nftModel.nftCollection;
          return forkJoin([
            this.nftCollectionService.getNftCollection(collection as string),
          ]);
        });
        forkJoin(observables).subscribe((results) => {
          results.forEach((result, index) => {
            const [collection] = result;
            nftModels[index].nftCollection = collection;
          });
          this.featuredNfts = nftModels;
          this.inProgress = false;
        });
      });

    const param: ParamPagination = {
      pagination: true,
      itemsPerPage: 4,
    };
    this.subscriptionCollection = this.nftCollectionService.getNftCollections(param).subscribe(nftCollections=>{

      this.nftCollections= nftCollections['hydra:member']
    });
  }

  ngOnDestroy(): void {
    this.subscriptionNftModel?.unsubscribe();
    this.subscriptionCollection?.unsubscribe();
  }
}
