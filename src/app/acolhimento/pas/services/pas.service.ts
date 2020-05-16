import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasService {
  apiBaseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) {}

  read() {
    return this._http.get(`${this.apiBaseUrl}/acolhimento`);
  }

  readAcolhido() {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/acolhido`);
  }

  readById(_id: string) {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/${_id}`);
  }

  save(form): Observable<any> {
    console.log(form);
    console.log();
    return //this._http.post(`${this.apiBaseUrl}/acolhimento`, form);
  }
}
