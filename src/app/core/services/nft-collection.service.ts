import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamPagination } from '../interface/param/param-pagination';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NftCollection } from '../interface/model/nft-collection';
import { CollectionData } from '../interface/data/collection-data';

@Injectable({
  providedIn: 'root',
})
export class NftCollectionService {
  private routeNftCollection: string = '/api/nft_collections';

  private nftCollectionApi: string;

  constructor(private http: HttpClient) {
    this.nftCollectionApi = `${environment.apiUrl}${this.routeNftCollection}`;
  }

  public getNftCollections(
    options: ParamPagination = {}
  ): Observable<CollectionData> {
    let queryParams = new HttpParams({ fromObject: options });

    return this.http.get<any>(this.nftCollectionApi, { params: queryParams });
  }
  public getNftCollection(id: number): Observable<NftCollection>;
  public getNftCollection(route: string): Observable<NftCollection>;
  public getNftCollection(id: number | string): Observable<NftCollection> {
    if (typeof id == 'number') {
      return this.http.get<any>(`${this.nftCollectionApi}/${id}`);
    } else {
      return this.http.get<any>(`${environment.apiUrl}${id}`);
    }
  }

  public extractCollection(collectionData: CollectionData): NftCollection[] {
    return collectionData['hydra:member'];
  }
}
