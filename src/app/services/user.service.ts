import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApiUrl: string;
  route = '/api/users/';
  constructor(api: ApiService, private http: HttpClient) {
    this.userApiUrl = `${api.BaseUrl}${this.route}`;
  }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.userApiUrl);
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.userApiUrl);
  }
}
