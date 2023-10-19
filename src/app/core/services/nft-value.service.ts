import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NftValue } from '../interface/nft-value';
import { ParamPagination } from '../interface/param-pagination';
import { ParamNftValue } from '../interface/param-nft-value';
import { NftValueData } from '../interface/nft-value-data';

@Injectable({
  providedIn: 'root',
})
export class NftValueService {
  private route: string = '/api/nft_values/';

  private baseUrl = environment.apiUrl;

  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${this.baseUrl}${this.route}`;
  }

  public getNftValue(id: number): Observable<NftValue>;
  public getNftValue(route: string): Observable<NftValue>;
  public getNftValue(id: string | number): Observable<NftValue> {
    if (typeof id === 'number') {
      return this.httpClient.get<NftValue>(`${this.apiUrl}${id}`);
    } else {
      return this.httpClient.get<NftValue>(`${this.baseUrl}${id}`);
    }
  }

  public getNftValues(
    param: ParamNftValue & ParamPagination = {}
  ): Observable<NftValueData> {
    let queryParams = new HttpParams({ fromObject: param });

    return this.httpClient.get<NftValueData>(this.apiUrl, {
      params: queryParams,
    });
  }

  public extractNftValues(nftValueData: NftValueData):NftValue[] {
    return nftValueData['hydra:member'];
  }
}
