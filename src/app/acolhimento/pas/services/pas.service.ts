import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasService {
  apiBaseUrl = environment.apiBaseUrl;
  pas_id: string;
  constructor(private _http: HttpClient) {}

  buscaApi(api): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('apiExterna', 'true');
    return this._http.get(api);
  }

  read(path = '') {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/${path}`);
  }

  readCollection(collection) {
    return this._http.get(`${this.apiBaseUrl}/${collection}`);
  }
  /* readAcolhido() {
    return this._http.get(`${this.apiBaseUrl}/acolhimento/acolhido`);
  }*/

  readById(document, documentId: string = '') {
    if (this.pas_id != undefined) {
      return this._http.get(
        `${this.apiBaseUrl}/acolhimento/${this.pas_id}/${document}/${documentId}`
      );
    }
  }

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

  concluirTratamento(motivo: string): Observable<any> {
    return this._http.post(
      `${this.apiBaseUrl}/acolhimento/${this.pas_id}/concluir?motivoconclusao=${motivo}`,
      null
    );
  }
}
