import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../interface/user';
import jwt_decode from 'jwt-decode';
import { UserCredential } from '../interface/user-credential';
import { Observable, pipe } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlApiLogin: string;
  urlApiUser: string;

  routeLogin: string = '/api/login';
  routeUser: string = '/api/users';
  constructor(
    private http: HttpClient,
    api: ApiService,
    private router: Router
  ) {
    this.urlApiLogin = `${api.BaseUrl}${this.routeLogin}`;
    this.urlApiUser = `${api.BaseUrl}${this.routeUser}`;
  }

  login(user: User) {
    const jsonUser = { username: user.email, password: user.password };

    this.http.post<any>(this.urlApiLogin, jsonUser).subscribe((res) => {
      localStorage.setItem('token', res.token);

      const DecodedToken: UserCredential = jwt_decode(res.token);

      localStorage.setItem('userCredentials', JSON.stringify(DecodedToken));

      const id = DecodedToken.id;

      this.getUserById(id).subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/account/', id]);
      });
    });
  }

  isLogin(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userCredentials');
    localStorage.removeItem('user');

    this.router.navigate(['/']);
  }

  getCredentiel(): UserCredential | null {
    const JSONCredentials = localStorage.getItem('userCredentials');

    return JSONCredentials ? JSON.parse(JSONCredentials) : null;
  }

  getCurrentUser(): Observable<User> | undefined {
    const credential: UserCredential | null = this.getCredentiel();

    if (credential) {
      return this.http.get<User>(`${this.urlApiUser}/${credential.id}`);
    } else {
      return undefined;
    }
  }

  getAuthUser() {
    const userjSON = localStorage.getItem('user');
    if (userjSON) {
      return JSON.parse(userjSON) as User;
    } else {
      return null;
    }
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlApiUser}/${id}`);
  }
}
