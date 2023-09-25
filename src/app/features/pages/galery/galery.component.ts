import { Component, OnInit } from '@angular/core';
import { NftService } from '../../../core/services/nft.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css'],
})
export class GaleryComponent implements OnInit {
  public nfts: any[] = [];

  public nftModels: any[] = [];

  public constructor(private nftService: NftService) {}

  ngOnInit(): void {
    let option = {
      page: 1,
    };
    this.nftService.getNftsWithModel(option).subscribe((data) => {
      this.nfts = this.nftService.extractNfts(data);
    });
  }
}
