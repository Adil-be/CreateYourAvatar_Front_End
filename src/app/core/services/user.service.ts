import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApiUrl: string;
  route = '/api/users';
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private AuthService: AuthService,
    private localStorage: LocalStorageService
  ) {
    this.userApiUrl = `${this.apiUrl}${this.route}`;
  }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.userApiUrl);
  }

  public getUser(id: number): Observable<any>;
  public getUser(route: string): Observable<any>;
  public getUser(id: number | string): Observable<any> {
    if (typeof id === 'number') {
      return this.http.get<any>(`${this.userApiUrl}/${id}`);
    } else {
      return this.http.get<any>(`${this.apiUrl}${id}`);
    }
  }

  public patchUser(id: number, partialUser: any): Observable<any> {
    const token = this.localStorage.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/merge-patch+json',
    });

    return this.http.patch<any>(`${this.userApiUrl}/${id}`, partialUser, {
      headers: headers,
    });
  }
}
