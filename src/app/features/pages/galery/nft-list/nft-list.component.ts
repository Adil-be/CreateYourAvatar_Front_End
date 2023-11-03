import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ParamPagination } from 'src/app/core/interface/param/param-pagination';
import { PaginatorIntlService } from 'src/app/core/services/paginator-intl.service';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { ModelData } from 'src/app/core/interface/data/model-data';
import { NftCollectionService } from 'src/app/core/services/nft-collection.service';
import { forkJoin } from 'rxjs';
import { ParamModel } from 'src/app/core/interface/param/param-model';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class NftListComponent implements OnInit, OnChanges {
  public nftModels: any[] | null = null;

  @Input() optionNft!: ParamModel;

  // Options paginations
  optionPaginanition: ParamPagination = {};
  max: number = 0;
  currentIndex: number = 0;
  itemsPerPage: number = 20;

  get currentPage() {
    return this.currentIndex + 1;
  }

  public constructor(
    private nftModelService: NftModelService,
    private collectionService: NftCollectionService
  ) {}

  ngOnInit(): void {
    this.getGaleryNft();
  }

  getGaleryNft() {
    this.nftModelService
      .getModels(this.getOption())
      .subscribe((data: ModelData) => {
        console.log('data ', data);
        this.max = data['hydra:totalItems'];
        let nftModels = this.nftModelService.extractNfts(data);

        const observables = nftModels.map((nftModel) => {
          const route = nftModel.nftCollection as string;
          return this.collectionService.getNftCollection(route);
        });

        forkJoin(observables).subscribe((collections) => {
          collections.forEach((collection, index) => {
            nftModels[index].nftCollection = collection;
          });
          this.nftModels = nftModels;
          console.log('nftModels ', this.nftModels);
        });
      });
  }

  ngOnChanges(): void {
    this.getGaleryNft();
  }

  private getOption(): ParamPagination & ParamModel {
    this.optionPaginanition = {
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };

    return Object.assign({}, this.optionPaginanition, this.optionNft);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentIndex = pageEvent.pageIndex;
    this.itemsPerPage = pageEvent.pageSize;
    this.getGaleryNft();
  }
}
