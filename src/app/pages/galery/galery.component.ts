import { Component, OnInit } from '@angular/core';
import { NftModelService } from 'src/app/services/nft-model.service';
import { NftService } from 'src/app/services/nft.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css'],
})
export class GaleryComponent implements OnInit {
  public nfts: any[] = [];

  public nftModels: any[] = [];

  public constructor(
    private nftService: NftService,
    private nftModelService: NftModelService
  ) {}

  public getNft() {
    this.nftService.getAllNft().subscribe;
  }

  ngOnInit(): void {
    this.nftService.getAllNft().subscribe((data) => {
      let nfs: any[] = data;

      this.nftModelService.getAllNftModels().subscribe((dataModel) => {
        this.nftModels = dataModel;

        nfs.forEach((nft) => {
          const modelId = nft.nftModel.id;
          let matchingModel = this.nftModels.find(
            (model) => modelId === model.id
          );
          nft.nftModel = matchingModel;
        });
        this.nfts = nfs;
      });
    });
  }
}
