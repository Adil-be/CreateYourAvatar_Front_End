import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ParamNft } from '../interface/param/param-nft';
import { ParamPagination } from '../interface/param/param-pagination';
import { Observable } from 'rxjs';
import { NftData } from '../interface/data/nft-data';
import { Nft } from '../interface/model/nft';

@Injectable({
  providedIn: 'root',
})
export class FullNftService {
  private routeModel = '/api/nfts_full/';
  private nftApi: string;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.nftApi = `${this.apiUrl}${this.routeModel}`;
  }

  public getFullNft(
    param: ParamNft & ParamPagination = {}
  ): Observable<NftData> {
    let queryParams = new HttpParams({ fromObject: param });

    return this.http.get<NftData>(this.nftApi, { params: queryParams });
  }

  public extractNfts(json: any): Nft[] {
    return json['hydra:member'];
  }
}
