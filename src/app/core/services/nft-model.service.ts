import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NftModel } from '../interface/nft-model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
    if (typeof id === 'number') {
      let url: string = `${this.nftModelApi}${id}`;
      return this.http.get<any>(url);
    } else {
      let url: string = `${this.apiUrl}${id}`;
      return this.http.get<any>(url);
    }
  }
  public getAllNftModels(): Observable<NftModel[]> {
    return this.http.get<any>(this.nftModelApi).pipe(
      map((json: any) => {
        const members: any = json['hydra:member'];
        return members;
      })
    );
  }
}
