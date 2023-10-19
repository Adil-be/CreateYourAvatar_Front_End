import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { NftData } from 'src/app/core/interface/nft-data';
import { ParamPagination } from 'src/app/core/interface/param-pagination';
import { ParamNft } from 'src/app/core/interface/param-nft';
import { PaginatorIntlService } from 'src/app/core/services/paginator-intl.service';

import { NftService } from 'src/app/core/services/nft.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { FullNftService } from 'src/app/core/services/full-nft.service';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class NftListComponent implements OnInit, OnChanges {
  public nfts: any[] = [];

  @Input() optionNft!: ParamNft;

  optionPaginanition: ParamPagination = {};

  max: number = 0;

  currentIndex: number = 0;
  itemsPerPage: number = 20;

  get currentPage() {
    return this.currentIndex + 1;
  }

  public constructor(private nftService: FullNftService,private ModelService:NftModelService) {}

  ngOnInit(): void {
    this.getGaleryNft();
  }

  ngOnChanges(): void {
    this.getGaleryNft();
  }

  getGaleryNft() {
    this.nftService
      .getFullNft(this.getOption())
      .subscribe((nftData: NftData) => {
        this.max = nftData['hydra:totalItems'];
        this.nfts = this.nftService.extractNfts(nftData);
      });
  }
  private getOption(): ParamPagination & ParamNft {
    this.optionPaginanition = {
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };

    let test = Object.assign({}, this.optionPaginanition, this.optionNft);

    return test;
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.currentIndex = pageEvent.pageIndex;
    this.itemsPerPage = pageEvent.pageSize;
    this.getGaleryNft();
  }
}
