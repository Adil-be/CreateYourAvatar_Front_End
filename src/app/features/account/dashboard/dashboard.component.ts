import { Component, OnInit } from '@angular/core';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Nft } from 'src/app/core/interface/model/nft';
import { NftModel } from 'src/app/core/interface/model/nft-model';
import { User } from 'src/app/core/interface/model/user';
import { NftModelService } from 'src/app/core/services/nft-model.service';
import { NftService } from 'src/app/core/services/nft.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public constructor(
    private auth: AuthService,
    private nftService: NftService,
    private nftModelService: NftModelService,
    private userService: UserService
  ) {}
  public latestNfts: Nft[] = [];

  public user!: User;

  ngOnInit(): void {
    this.auth
      .getCurrentUser()
      ?.pipe(
        // On Utilise switchMap pour passer à la récupération des NFT une fois que l'utilisateur est disponible
        switchMap((user) => {
          if (!user) {
            return [];
          }
          this.user = user;
          return this.nftService.getAllNft({
            'user.id': user.id,
            'order[purchaseDate]': 'DESC',
            itemsPerPage: 4,
          });
        }),
        // On Utilise switchMap pour effectuer des appels asynchrones pour chaque NFT et modèle
        switchMap((nftData) => {
          const latestNfts = this.nftService.extractNfts(nftData);
          const observables = latestNfts.map((nft: Nft) => {
            const nftModelId = nft.nftModel;
            return this.nftModelService.getNftModelById(nft.nftModel as string);
          });
          return forkJoin(observables).pipe(
            // on Associe les modèles de NFT à chaque NFT
            switchMap((nftModels) => {
              latestNfts.forEach((nft, index) => {
                nft.nftModel = nftModels[index];
              });
              return of(latestNfts);
            })
          );
        })
      )
      .subscribe((latestNfts) => {
        this.latestNfts = latestNfts;
      });
  }

  public getModel(nft: Nft) {
    return nft.nftModel as NftModel;
  }

  public getImageNft(nft: Nft) {
    let model = nft.nftModel as NftModel;
    return model.nftImages![0];
  }
}
