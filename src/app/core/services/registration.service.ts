import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registerUrl: string;
  route = '/register';
  constructor(api: ApiService, private http: HttpClient) {
    this.registerUrl = `${api.BaseUrl}${this.route}`;
  }

  public registerUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    // Convertir l'objet user en chaîne JSON
    const userJsonString = JSON.stringify(user);

    return this.http.post<any>(this.registerUrl, userJsonString);
  }
}
