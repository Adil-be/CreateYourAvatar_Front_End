import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from '../../../core/services/nft.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { UserService } from 'src/app/core/services/user.service';
import { ParamNft } from 'src/app/core/interface/param-nft';
import { NftData } from 'src/app/core/interface/nft-data';
import { Nft } from 'src/app/core/interface/nft';
import { NftCollectionService } from 'src/app/core/services/nft-collection.service';
import { NftModel } from 'src/app/core/interface/nft-model';
import { NftCollection } from 'src/app/core/interface/nft-collection';
import { User } from 'src/app/core/interface/user';
import { NftValueService } from 'src/app/core/services/nft-value.service';
import { ParamNftValue } from 'src/app/core/interface/param-nft-value';
import { NftValue } from 'src/app/core/interface/nft-value';
import { NftValueData } from 'src/app/core/interface/nft-value-data';
import { DataSerie, GraphData } from 'src/app/core/interface/graph-data';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  public nftModel!: NftModel;
  public nftCollection!: NftCollection;
  public nfts: Nft[] = [];
  public nftValues: NftValue[] = [];
  public chartData: GraphData = [];

  public constructor(
    private nftService: NftService,
    private userService: UserService,
    private nftModelService: NftModelService,
    private nftCollectionService: NftCollectionService,
    private nftValueService: NftValueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    const paramNftValue: ParamNftValue = {
      'nftModel.id': id,
      'order[valueDate]': 'asc',
    };

    const paramNft: ParamNft = { 'nftModel.id': id };
    // get the model
    const Modelsubscription = this.nftModelService
      .getNftModelById(id)
      .subscribe((nftModel) => {
        this.nftModel = nftModel;
        const collectionRoute = nftModel.nftCollection as string;
        const subcriptionCollection = this.nftCollectionService
          .getNftCollection(collectionRoute)
          .subscribe((res) => {
            this.nftCollection = res;
          });
      });

    // get the nft of that model with user
    const Nftsubscription = this.nftService
      .getAllNft(paramNft)
      .subscribe((nftData: NftData) => {
        let nfts = this.nftService.extractNfts(nftData);

        const observable = nfts.map((nft) => {
          const route = nft.user as string;
          return this.userService.getUser(route);
        });

        forkJoin(observable).subscribe((users) => {
          users.forEach((user, index) => {
            nfts[index].user = user as User;
          });
          this.nfts = nfts;
        });
      });

    const NftValueSubscription = this.nftValueService
      .getNftValues(paramNftValue)
      .subscribe((nftValueData: NftValueData) => {
       
        let nftsValues = this.nftValueService.extractNftValues(nftValueData); 

        let dataSerie: DataSerie = {
          name: 'Nft Value',
          series: [],
        };
        nftsValues.forEach((nftValue) => {
          dataSerie.series.push({
            name: nftValue.valueDate,
            value: nftValue.value,
          });
        });
        this.chartData = [dataSerie];
      });

    // this.nftService.getNfById(id).subscribe((nft) => {
    //   const user$ = this.userService.getUser(nft.user as string);
    //   const model$ = this.nftModelService.getNftModelById(
    //     nft.nftModel as string
    //   );

    //   forkJoin([user$, model$]).subscribe(([user, nftModel]) => {
    //     nft.user = user;
    //     nft.nftModel = nftModel;
    //     this.nft = nft;
    //   });
    // });
  }
  getUser(nft: Nft) {
    const user = nft.user;
    return typeof user == 'string' ? null : (user as User);
  }
}
