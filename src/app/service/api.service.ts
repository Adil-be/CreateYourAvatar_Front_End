import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public BaseUrl: string = 'https://localhost:8000';
}
