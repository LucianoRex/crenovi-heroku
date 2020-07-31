import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AcolhimentoService {
  apiBaseUrl = environment.apiBaseUrl;
  
  pas_id: string;
  constructor(private _http: HttpClient) {}



  
  read(model) {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/${model}`);
  }

  readById(model, _id: string = '') {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/${model}/${_id}`);
  }

  save(form): Observable<any> {
    if (form._id != undefined) {
      return this._http.put(
        `${this.apiBaseUrl}/acolhimento/${form.path}/${form._id}`,
        form
      );
    } else {
      return this._http.post(
        `${this.apiBaseUrl}/acolhimento/${form.path}`,
        form
      );
    }
  }

  remove(path) {
    this._http.delete(`${this.apiBaseUrl}/${path}`).subscribe((res) => {
      alert('Documento Excluído');
    });
  }
}
