import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AcolhidoService {
  apiBaseUrl = environment.apiBaseUrl;

  // pas_id: string;
  constructor(private _http: HttpClient) {}

  buscaApi(api): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('apiExterna', 'true');
    return this._http.get(api);
  }

  read(path = '') {
    return this._http.get(`${this.apiBaseUrl}/acolhido/${path}`);
  }

  readCollection(collection) {
    return this._http.get(`${this.apiBaseUrl}/${collection}`);
  }

  readById(path, document, array: boolean = false) {
    return this._http.get(`${this.apiBaseUrl}/${path}/${document}`);
  }

  save(form, _id, path: string): Observable<any> {
    if (form[form.path]._id && form[form.path]._id != undefined) {
      return this._http.put(
        `${this.apiBaseUrl}/acolhido/${form[form.path]._id}`,
        form
      );
    } else {
      return this._http.post(`${this.apiBaseUrl}/acolhido`, form);
    }
  }

  remove(path) {
    this._http.delete(`${this.apiBaseUrl}/acolhido${path}`).subscribe((res) => {
      alert('Documento Excluído');
    });
  }

  concluirTratamento(
    path,
    conclusao: {
      dataEgresso: Date;
      motivo: string;
    }
  ): Observable<any> {
    console.log(path);
    return this._http.post(`${this.apiBaseUrl}/${path}/concluir`, conclusao);
  }

  carregaDadosPsicoterapia(path, form: any): Observable<any> {
    return this._http.post(`${this.apiBaseUrl}/${path}/procedimentos`, form);
  }
}
