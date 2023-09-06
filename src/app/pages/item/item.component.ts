import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftModelService } from 'src/app/service/nft-model.service';
import { NftService } from 'src/app/service/nft.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  public nft: any;

  public constructor(
    private nftService: NftService,
    private nftModelService: NftModelService,
    private usersServive: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let nftModel;
    let user;
    const id = this.route.snapshot.params['id'];
    this.nftService.getNfById(id).subscribe((data) => {
      this.nft = data;

      // requete nftModel
      this.nftModelService
        .getNftModelById(data.nftModel.id)
        .subscribe((dataNftModel) => {
          nftModel = dataNftModel;
          this.nft.nftModel = nftModel;
        });
      
      console.log(this.nft);
    });
  }
}
