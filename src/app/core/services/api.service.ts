import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public BaseUrl: string = 'https://localhost:8000';

  public getRoute(route: string): Observable<any> {
    const http = inject(HttpClient);

    return http.get(`${this.BaseUrl}${route}`);
  }
}
