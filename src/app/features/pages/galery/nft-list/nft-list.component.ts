import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { NftData } from 'src/app/core/interface/nft-data';
import { ParamPagination } from 'src/app/core/interface/param-pagination';
import { ParamNft } from 'src/app/core/interface/param-nft';
import { PaginatorIntlService } from 'src/app/core/services/paginator-intl.service';

import { NftService } from 'src/app/core/services/nft.service';

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

  public constructor(private nftService: NftService) {}

  ngOnInit(): void {
    this.getGaleryNft();
  }

  ngOnChanges(): void {
    this.getGaleryNft();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.currentIndex = pageEvent.pageIndex;
    this.itemsPerPage = pageEvent.pageSize;
    this.getGaleryNft();
  }

  getGaleryNft() {
    this.nftService
      .getNftsWithModel(this.getOption())
      .subscribe((data: NftData) => {
        console.log('data ', data);
        this.max = data['hydra:totalItems'];
        this.nfts = this.nftService.extractNfts(data);
      });
  }

  private getOption(): ParamPagination & ParamNft {
    this.optionPaginanition = {
      page: this.currentPage,
      itemsPerPage: this.itemsPerPage,
    };

    return Object.assign({}, this.optionPaginanition, this.optionNft);
  }
}
