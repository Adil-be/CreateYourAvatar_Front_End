import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Nft } from '../interface/nft';
import { NftModel } from '../interface/nft-model';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  private nftApiUrl: string;
  private nftModelApi: string;

  private routeNft = '/api/nfts/';
  private routeModel = '/api/nft_models/';

  constructor(private http: HttpClient, api: ApiService) {
    this.nftApiUrl = `${api.BaseUrl}${this.routeNft}`;
    this.nftModelApi = `${api.BaseUrl}${this.routeModel}`;
  }

  public getAllNft(
    param: { [param: string]: string | number | boolean } = {}
  ): Observable<Nft[]> {
    let queryParams = new HttpParams({ fromObject: param });

    return this.http.get(this.nftApiUrl, { params: queryParams }).pipe(
      map((json: any) => {
        const members: Nft[] = json['hydra:member'];
        return members;
      })
    );
  }

  public getNfById(id: number): Observable<Nft> {
    return this.http.get(`${this.nftApiUrl}${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getAllNftModels(): Observable<NftModel[]> {
    return this.http.get<any>(this.nftModelApi).pipe(
      map((json: any) => {
        const members: any = json['hydra:member'];
        return members;
      })
    );
  }

  public getNftModelById(id: number): Observable<any> {
    let url: string = `${this.nftModelApi}${id}`;
    return this.http.get<any>(url);
  }

  public getNftsWithModel(
    param: { [param: string]: string | number | boolean } = {}
  ): Observable<Nft[]> {
    return this.getAllNft(param).pipe(
      mergeMap((nfts) => {
        return this.getAllNftModels().pipe(
          map((dataModel) => {
            let nftModels: NftModel[] = dataModel;

            nfts.forEach((nft: Nft) => {
              const modelId = nft.nftModel.id;
              let matchingModel = nftModels.find(
                (model) => modelId === model.id
              );
              nft.nftModel = matchingModel;
            });

            return nfts;
          })
        );
      })
    );
  }
  
  public getNftWithModel(id: number): Observable<Nft> {
    return this.getNfById(id).pipe(
      switchMap((nft) => {
        const id = nft.nftModel.id;
        return this.getNftModelById(id).pipe(
          map((nftModel) => {
            nft.nftModel = nftModel;
            return nft;
          })
        );
      })
    );
  }

  
}
