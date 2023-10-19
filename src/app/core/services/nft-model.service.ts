import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NftModel } from '../interface/nft-model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParamPagination } from '../interface/param-pagination';
import { ParamModel } from '../interface/param-model';
import { ParamNft } from '../interface/param-nft';
import { ModelData } from '../interface/model-data';

@Injectable({
  providedIn: 'root',
})
export class NftModelService {
  private routeModel = '/api/nft_models/';
  private nftModelApi: string;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.nftModelApi = `${this.apiUrl}${this.routeModel}`;
  }

  public getNftModelById(route: string): Observable<NftModel>;
  public getNftModelById(id: number): Observable<NftModel>;
  public getNftModelById(id: number | string): Observable<NftModel> {
    if (typeof id == 'number') {
      
      let url: string = `${this.nftModelApi}${id}`;
      return this.http.get<any>(url);
    } else {
      console.log('test');
      let url: string = `${this.apiUrl}${id}`;
      return this.http.get<any>(url);
    }
  }
  public getModels(
    param: ParamModel & ParamPagination = {}
  ): Observable<ModelData> {
    let queryParams = new HttpParams({ fromObject: param });
    return this.http.get<any>(this.nftModelApi, { params: queryParams });
  }

  public extractNfts(json: any): NftModel[] {
    return json['hydra:member'];
  }
}
