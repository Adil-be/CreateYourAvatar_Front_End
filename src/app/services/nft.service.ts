import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Nft } from '../interface/nft';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  private nftApiUrl: string;

  private route = '/api/nfts/';

  constructor(private http: HttpClient, api: ApiService) {
    this.nftApiUrl = `${api.BaseUrl}${this.route}`;
  }

  public getAllNft(): Observable<Nft[]> {
    return this.http.get(this.nftApiUrl).pipe(
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
}
