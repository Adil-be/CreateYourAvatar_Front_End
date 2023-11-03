import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { EthValueData } from '../interface/data/eth-value-data';
import { DataEth, EthValuesData } from '../interface/data/eth-values-data';

@Injectable({
  providedIn: 'root',
})
export class EthService {
  private apiHistoricValues: string =
    'https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=EUR&limit=';

  private apiExhangeRate: string =
    'https://api.coinbase.com/v2/exchange-rates?currency=ETH';

  constructor(private httpClient: HttpClient) {}

  public getEthValues(limit: number = 7): Observable<DataEth[]> {
    return this.httpClient
      .get<EthValuesData>(`${this.apiHistoricValues}${limit}`)
      .pipe(
        map((object: EthValuesData) => {
          return object.Data.Data;
        })
      );
  }

  public getEthValue(): Observable<EthValueData> {
    return this.httpClient.get<EthValueData>(`${this.apiExhangeRate}`);
  }
}
