import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NftService {
  private nftApiUrl: string;

  private route = '/api/nfts/';

  constructor(private http: HttpClient, api: ApiService) {
    this.nftApiUrl = `${api.BaseUrl}${this.route}`;
    console.log(this.nftApiUrl);
  }

  public getAllNft(): Observable<any> {

    return this.http.get(this.nftApiUrl).pipe(
      map((json: any) => {
        const members: any = json['hydra:member'];
        return members;
      })
    );
  }

  public getNfById(id: number): Observable<any> {
    return this.http.get(`${this.nftApiUrl}${id}`);
  }

}
