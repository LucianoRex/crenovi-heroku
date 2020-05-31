import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComunidadeService {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) {}

  save(form) {
    return this._http.post(`${this.apiBaseUrl}/comunidade/comunidade`, form);
  }
  read() {
    return this._http.get(`${this.apiBaseUrl}/comunidade/comunidade`);
  }
}
