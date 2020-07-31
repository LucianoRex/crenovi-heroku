import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GrupoTerapeuticoService {
  apiBaseUrl = environment.apiBaseUrl;
  grupoTerapeutico_id: string;
  constructor(private _http: HttpClient) {}

  read(path = '') {
    return this._http.get(`${this.apiBaseUrl}/grupoterapeutico/${path}`);
  }

  readById(_id: string) {
    return this._http.get(`${this.apiBaseUrl}/grupoterapeutico/${_id}`);
  }
  save(form): Observable<any> {
    if (form._id != undefined) {
      return this._http.put(
        `${this.apiBaseUrl}/grupoterapeutico/${form._id}`,
        form
      );
    } else {
      return this._http.post(`${this.apiBaseUrl}/grupoterapeutico`, form);
    }
  }
}
