import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interface/model/user';
import { UserRegistration } from '../interface/UserRegistration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registerUrl: string;
  route = '/register';
  constructor( private http: HttpClient) {
    this.registerUrl = `${environment.apiUrl}${this.route}`;
  }

  public registerUser(user: UserRegistration): Observable<any> {
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
