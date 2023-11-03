import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from '../../../core/services/nft.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { UserService } from 'src/app/core/services/user.service';
import { ParamNft } from 'src/app/core/interface/param/param-nft';
import { NftData } from 'src/app/core/interface/data/nft-data';
import { Nft } from 'src/app/core/interface/model/nft';
import { NftCollectionService } from 'src/app/core/services/nft-collection.service';
import { NftModel } from 'src/app/core/interface/model/nft-model';
import { NftCollection } from 'src/app/core/interface/model/nft-collection';
import { User } from 'src/app/core/interface/model/user';
import { NftValueService } from 'src/app/core/services/nft-value.service';
import { ParamNftValue } from 'src/app/core/interface/param/param-nft-value';
import { NftValue } from 'src/app/core/interface/model/nft-value';
import { NftValueData } from 'src/app/core/interface/data/nft-value-data';
import { DataSerie, GraphData } from 'src/app/core/interface/graph-data';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  public nftModel: NftModel | null = null;
  public nftCollection: NftCollection | null = null;
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
          let date = new Date(nftValue.valueDate);
          dataSerie.series.push({
            name: date,
            value: nftValue.value,
          });
        });
        this.chartData = [dataSerie];
      });
  }

  getUser(nft: Nft) {
    const user = nft.user;
    return typeof user == 'string' ? null : (user as User);
  }

  toDate(date: Date): Date {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
}
