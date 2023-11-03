import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserImageService {
  userImagePostUrl: string;
  postRoute = '/api/image/user/';
  private apiUrl = environment.apiUrl;

  constructor(private http :HttpClient) {
    this.userImagePostUrl = `${this.apiUrl}${this.postRoute}`;
  }


  postUserImage(idUser:number, form:FormData ){

  const route = `${this.userImagePostUrl}${idUser}`
    return this.http.post(route,form)
  }
}
