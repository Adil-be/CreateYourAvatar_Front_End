import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApiUrl: string;
  route = '/api/users';
  constructor(
    api: ApiService,
    private http: HttpClient,
    private AuthService: AuthService
  ) {
    this.userApiUrl = `${api.BaseUrl}${this.route}`;
  }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.userApiUrl);
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.userApiUrl}/${id}`);
  }

  public patchUser(id: number, partialUser: any): Observable<any> {
    const token = this.AuthService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/merge-patch+json', // Ajoutez cette ligne
    });

    return this.http.patch<any>(`${this.userApiUrl}/${id}`, partialUser, {
      headers: headers,
    });
  }
}
