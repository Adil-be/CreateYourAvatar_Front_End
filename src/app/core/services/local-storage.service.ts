import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interface/user';
import { UserCredential } from '../interface/user-credential';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _token$ = new BehaviorSubject<any>(null);
  public token$ = this._token$.asObservable();

  private _userCredential$ = new BehaviorSubject<any>(null);
  public userCredential$ = this._userCredential$.asObservable();

  private _user$ = new BehaviorSubject<any>(null);
  public user$ = this._user$.asObservable();

  constructor() {
    this.InitLocalStorage();
  }

  InitLocalStorage() {
    const userCredentialsJson = localStorage.getItem('userCredentials');
    if (userCredentialsJson) {
      try {
        const userCredentials = JSON.parse(userCredentialsJson);
        const expirationDate = new Date(userCredentials.exp * 1000);
        const now = new Date();

        if (expirationDate < now) {
          this.clearAll();
        } else {
          this._userCredential$.next(userCredentials);

          const token = localStorage.getItem('token');
          const userJson = localStorage.getItem('user');

          if (token) this._token$.next(token);
          if (userJson) this._user$.next(JSON.parse(userJson));
        }
      } catch (error) {
        this.clearAll();
      }
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this._token$.next(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this._token$.next(null);
  }
  setUserCredentials(userCred: UserCredential) {
    const jsonData = JSON.stringify(userCred);
    localStorage.setItem('userCredentials', jsonData);
    this._userCredential$.next(userCred);
  }

  clearUserCredentials() {
    localStorage.removeItem('userCredentials');
    this._userCredential$.next(null);
  }
  setUser(user: User) {
    const jsonData = JSON.stringify(user);
    localStorage.setItem('user', jsonData);
    this._user$.next(user);
  }

  clearUser() {
    localStorage.removeItem('user');
    this._user$.next(null);
  }

  clearAll() {
    this.clearToken();
    this.clearUser();
    this.clearUserCredentials();
  }
}
