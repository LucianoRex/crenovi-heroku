import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasService {
  apiBaseUrl = environment.apiBaseUrl;
  pas_id: string;
  constructor(private _http: HttpClient) {}

  read(path = '') {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/${path}`);
  }

  readAcolhido() {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/acolhido`);
  }

  readById(document, documentId: string = '') {
    if (this.pas_id != undefined) {
      return this._http.get(
        `${this.apiBaseUrl}/acolhimento/${this.pas_id}/${document}/${documentId}`
      );
    }
  }

  /*readMedicamento(_id: string, document) {
    return this._http.get(
      `${this.apiBaseUrl}/acolhimento/${this.pas_id}/${document}`
    );
  }*/

  save(form): Observable<any> {
    if (this.pas_id != undefined) {
      if (form[form.path]._id && form[form.path]._id != undefined) {
        return this._http.put(
          `${this.apiBaseUrl}/acolhimento/${this.pas_id}/${form.path}/${
            form[form.path]._id
          }`,
          form
        );
      } else {
        return this._http.put(
          `${this.apiBaseUrl}/acolhimento/${this.pas_id}/${form.path}`,
          form
        );
      }
    } else {
      return this._http.post(
        `${this.apiBaseUrl}/acolhimento/${form.path}`,
        form
      );
    }
  }

  remove() {
    alert('Vamos remover?');
  }
}
