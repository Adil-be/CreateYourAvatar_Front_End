import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NftModelService {
  private nftModelApi: string;
  private route = '/api/nft_models/';

  constructor(private http: HttpClient, api: ApiService) {
    this.nftModelApi = `${api.BaseUrl}${this.route}`;
  }

  public getAllNftModels(): Observable<any> {
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
}
