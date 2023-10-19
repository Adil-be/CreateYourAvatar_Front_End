import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ModelData } from 'src/app/core/interface/model-data';
import { Nft } from 'src/app/core/interface/nft';
import { NftData } from 'src/app/core/interface/nft-data';
import { NftModel } from 'src/app/core/interface/nft-model';
import { order } from 'src/app/core/interface/param-nft';
import { NftCollectionService } from 'src/app/core/services/nft-collection.service';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { NftService } from 'src/app/core/services/nft.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public constructor(
    private nftService: NftService,
    private userService: UserService,
    private nftModelService: NftModelService,
    private nftCollectionService: NftCollectionService
  ) {}
  public featuredNfts: NftModel[] = [];
  public inProgress: boolean = true;

  ngOnInit() {
    let order: order = 'DESC';
    let option = {
      featured: true,
      'order[purchaseDate]': order,
      // 'page': 1,
      itemsPerPage: 4,
    };

    this.nftModelService.getModels(option).subscribe((data: ModelData) => {
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
        console.log('nfts ', this.featuredNfts);
      });
    });
  }
}
