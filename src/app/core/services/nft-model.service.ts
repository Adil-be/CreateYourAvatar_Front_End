import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NftModel } from '../interface/model/nft-model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParamPagination } from '../interface/param/param-pagination';
import { ParamModel } from '../interface/param/param-model';
import { ModelData } from '../interface/data/model-data';

@Injectable({
  providedIn: 'root',
})
export class NftModelService {
  private routeModel = '/api/nft_models/';
  private nftModelApi: string;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.nftModelApi = `${environment.apiUrl}${this.routeModel}`;
  }

  public getNftModelById(route: string): Observable<NftModel>;
  public getNftModelById(id: number): Observable<NftModel>;
  public getNftModelById(id: number | string): Observable<NftModel> {
    
    if (typeof id == 'number') {
      let url: string = `${this.apiUrl}${this.routeModel}${id}`;
      return this.http.get<any>(url);
    } else {
      let url: string = `${this.apiUrl}${id}`;
      return this.http.get<any>(url);
    }
  }
  public getModels(param: ParamModel & ParamPagination = {}): Observable<ModelData> {
    
    // param  for the api platform Filter
    let queryParams = new HttpParams({ fromObject: param });

    return this.http.get<any>(this.nftModelApi, { params: queryParams });
  }

  public extractNfts(json: any): NftModel[] {
    return json['hydra:member'];
  }
}
