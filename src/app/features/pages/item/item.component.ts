import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from '../../../core/services/nft.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  public nft: any;

  public constructor(
    private nftService: NftService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let nftModel;
    let user;
    const id = this.route.snapshot.params['id'];
    this.nftService.getNftWithModel(id).subscribe((res) => {
      this.nft = res;
    });
  }
}
