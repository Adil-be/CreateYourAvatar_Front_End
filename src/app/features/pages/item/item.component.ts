import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from '../../../core/services/nft.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  public nft: any;

  public constructor(
    private nftService: NftService,
    private userService: UserService,
    private nftModelService: NftModelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let nftModel;
    let user;
    const id = this.route.snapshot.params['id'];
    this.nftService.getNfById(id).subscribe((nft) => {
      const user$ = this.userService.getUser(nft.user as string);
      const model$ = this.nftModelService.getNftModelById(
        nft.nftModel as string
      );

      forkJoin([user$, model$]).subscribe(([user, nftModel]) => {
        nft.user = user;
        nft.nftModel = nftModel;
        this.nft = nft;
      });
    });
  }
}
