import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  apiBaseUrl = environment.apiBaseUrl;
  pas_id: string;
  constructor(private _http: HttpClient) {}

  read(model) {
    return this._http.get(`${this.apiBaseUrl}/colaborador/${model}`);
  }

  readById(model, _id: string = '') {
    return this._http.get(`${this.apiBaseUrl}/colaborador/${model}/${_id}`);
  }

  save(form): Observable<any> {
    if (form._id != undefined) {
      return this._http.put(
        `${this.apiBaseUrl}/colaborador/${form.path}/${form._id}`,
        form
      );
    } else {
      return this._http.post(
        `${this.apiBaseUrl}/colaborador/${form.path}`,
        form
      );
    }
  }

  remove() {
    alert('Vamos remover?');
  }
}
