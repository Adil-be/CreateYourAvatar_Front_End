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
    const tokenJson = localStorage.getItem('token');
    const userCredentialsJson = localStorage.getItem('userCredentials');
    const userJson = localStorage.getItem('user');
    if (tokenJson) {
      this._token$.next(JSON.parse(tokenJson));
    }
    if (userCredentialsJson) {
      this._userCredential$.next(JSON.parse(userCredentialsJson));
    }
    if (userJson) {
      this._user$.next(JSON.parse(userJson));
    }
  }

  setToken(token: string) {
    const jsonData = JSON.stringify(token);
    localStorage.setItem('token', jsonData);
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
}
