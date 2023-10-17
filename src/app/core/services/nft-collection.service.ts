import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ParamPagination } from '../interface/param-pagination';

@Injectable({
  providedIn: 'root',
})
export class NftCollectionService {
  private routeNftCollection: string = '/api/nft_collections';

  private nftCollectionApi: string;

  constructor(private http: HttpClient, api: ApiService) {
    this.nftCollectionApi = `${api.BaseUrl}${this.routeNftCollection}`;
  }

  public getNftCollection(options: ParamPagination = {}): any {
    let queryParams = new HttpParams({ fromObject: options });

    return this.http.get<any>(this.nftCollectionApi, { params: queryParams });
  }
}
