import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { Nft } from '../interface/nft';
import { NftModel } from '../interface/nft-model';
import { ParamPagination } from '../interface/param-pagination';
import { ParamNft } from '../interface/param-nft';
import { NftData } from '../interface/nft-data';

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

  public getAllNft(param: ParamNft & ParamPagination = {}): Observable<NftData> {
    let queryParams = new HttpParams({ fromObject: param });

    return this.http.get<NftData>(this.nftApiUrl, { params: queryParams });
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

  public getNftModelById(id: number): Observable<NftModel> {
    let url: string = `${this.nftModelApi}${id}`;
    return this.http.get<any>(url);
  }

  public getNftsWithModel(
    param: ParamNft & ParamPagination = {}
  ): Observable<NftData> {
    return this.getAllNft(param).pipe(
      mergeMap((json) => {
        return this.getAllNftModels().pipe(
          map((dataModel) => {
            let nftModels: NftModel[] = dataModel;

            let nfts: Nft[] = json['hydra:member'];

            nfts.forEach((nft: Nft) => {
              const modelId = nft.nftModel.id;
              const matchingModel = nftModels.find(
                (model) => modelId === model.id
              );
              nft.nftModel = matchingModel as NftModel;
            });

            return json;
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

  public extractNfts(json: any) {
    return json['hydra:member'];
  }
}
