import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../interface/user';
import jwt_decode from 'jwt-decode';
import { UserCredential } from '../interface/user-credential';
import { Observable, Observer, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserLogin } from '../interface/UserLogin';

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
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.urlApiLogin = `${api.BaseUrl}${this.routeLogin}`;
    this.urlApiUser = `${api.BaseUrl}${this.routeUser}`;
  }

  login(user: UserLogin) {
    const jsonUser = { username: user.email, password: user.password };

    this.http.post<any>(this.urlApiLogin, jsonUser).subscribe((res) => {
      this.localStorage.setToken(res.token);

      const DecodedToken: UserCredential = jwt_decode(res.token);

      this.localStorage.setUserCredentials(DecodedToken);

      const id = DecodedToken.id;

      this.getUserById(id).subscribe((user) => {
        console.log(user);
        this.localStorage.setUser(user);

        this.router.navigate(['/account']);
      });
    });
  }

  isLogin(): boolean {
    const UserCred = this.getCredentiel();

    if (UserCred) {
      try {
        const expirationDate = new Date(UserCred.exp * 1000);
        const now = new Date();

        if (now < expirationDate) {
          return true;
        } else {
          this.localStorage.clearUserCredentials();
          this.localStorage.clearToken();
          this.localStorage.clearUser();
          return false;
        }
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  logout(): void {
    this.localStorage.clearToken();
    this.localStorage.clearUser();
    this.localStorage.clearUserCredentials();

    this.router.navigate(['/']);
  }

  getCredentiel(): UserCredential | null {
    const JSONCredentials = localStorage.getItem('userCredentials');

    return JSONCredentials ? JSON.parse(JSONCredentials) : null;
  }
  getToken(): string | null {
    const Token = localStorage.getItem('token');

    return Token ? Token : null;
  }

  getCurrentUser(): Observable<User> | undefined {
    const credential: UserCredential | null = this.getCredentiel();

    if (credential) {
      return this.http.get<User>(`${this.urlApiUser}/${credential.id}`);
    } else {
      console.log('test');
      return undefined;
    }
  }

  getAuthUser(): Observable<any> {
    return new Observable((observer: Observer<User | null>) => {
      const userjSON = localStorage.getItem('user');

      observer.next(this.createUserFromJson(userjSON));

      const handler = (e: StorageEvent) => {
        console.log('ok');
        if (e.key === 'user') {
          observer.next(this.createUserFromJson(e.newValue));
        }
      };

      window.addEventListener('storage', handler);
      return () => {
        window.removeEventListener('storage', handler);
      };
    });
  }

  createUserFromJson(userJson: string | null): User | null {
    let user = null;
    if (userJson) {
      user = JSON.parse(userJson) as User;
    }
    return user;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlApiUser}/${id}`);
  }
}
