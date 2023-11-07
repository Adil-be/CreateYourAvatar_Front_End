import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Nft } from '../interface/model/nft';
import { NftModel } from '../interface/model/nft-model';
import { ParamPagination } from '../interface/param/param-pagination';
import { ParamNft } from '../interface/param/param-nft';
import { NftData } from '../interface/data/nft-data';
import { AuthService } from '../auth/auth.service';

import { environment } from '../../../environments/environment';
import { NftModelService } from './nft-model.service';
import { LocalStorageService } from './local-storage.service';
import { User } from '../interface/model/user';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  private nftApiUrl: string;
  private apiUrl = environment.apiUrl;

  private routeNft = '/api/nfts';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private localStorage: LocalStorageService,
    private nftModelService: NftModelService
  ) {
    this.nftApiUrl = `${this.apiUrl}${this.routeNft}`;
  }

  public getAllNft(
    param: ParamNft & ParamPagination = {}
  ): Observable<NftData> {
    let queryParams = new HttpParams({ fromObject: param });

    return this.http.get<NftData>(this.nftApiUrl, { params: queryParams });
  }

  public getNfById(route: string): Observable<Nft>;
  public getNfById(id: number): Observable<Nft>;
  public getNfById(idOrRoute: number | string): Observable<Nft> {
    if (typeof idOrRoute == 'string') {
      return this.http.get<Nft>(`${this.apiUrl}${idOrRoute}`);
    } else {
      return this.http.get<Nft>(`${this.nftApiUrl}/${idOrRoute}`);
    }
  }

  // public getNftsWithModel(
  //   param: ParamNft & ParamPagination = {}
  // ): Observable<NftData> {
  //   return this.getAllNft(param).pipe(
  //     mergeMap((json) => {
  //       return this.getAllNftModels().pipe(
  //         map((dataModel) => {
  //           let nftModels: NftModel[] = dataModel;

  //           let nfts: Nft[] = json['hydra:member'];

  //           nfts.forEach((nft: Nft) => {
  //             const modelId = nft.nftModel.id;
  //             const matchingModel = nftModels.find(
  //               (model) => modelId === model.id
  //             );
  //             nft.nftModel = matchingModel as NftModel;
  //           });

  //           return json;
  //         })
  //       );
  //     })
  //   );
  // }

  // public constructNftCard(
  //   param: ParamNft & ParamPagination = {}
  // ): Observable<NftData> {
  //   return this.getAllNft(param).pipe(mergeMap(json=>{

  //     let nfts: Nft[] = json['hydra:member'];

  //     nfts.map(nft=>{

  //     })
  //     return

  //   })

  //   );
  // }

  public getNftWithModel(id: number): Observable<Nft> {
    return this.getNfById(id).pipe(
      switchMap((nft) => {
        const id = nft.nftModel as string;
        return this.nftModelService.getNftModelById(id).pipe(
          map((nftModel) => {
            nft.nftModel = nftModel;
            return nft;
          })
        );
      })
    );
  }

  public extractNfts(json: any): Nft[] {
    return json['hydra:member'];
  }

  public patchNft(id: number, data: any) {
    const token = this.localStorage.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/merge-patch+json',
    });
    return this.http.patch(`${this.nftApiUrl}/${id}`, data, {
      headers: headers,
    });
  }

  public postNft(nft: any) {
    return this.http.post(this.nftApiUrl, nft);
  }
}
