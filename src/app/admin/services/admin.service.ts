import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) {}

  readUsers(): Observable<any> {
    return this._http.get(`${this.apiUrl}/users/users`);
  }
  saveUser(form): Observable<any> {
    if (form._id == undefined) {
    
      return this._http.post(`${this.apiUrl}/users/register`, form);
    } else {
      return this._http.put(`${this.apiUrl}/users/register/${form._id}`, form);
    }
  }
}
