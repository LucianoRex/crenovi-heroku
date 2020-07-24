import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProntuarioService {
  apiBaseUrl = environment.apiBaseUrl;

  // pas_id: string;
  constructor(private _http: HttpClient) {}

  buscaApi(api): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('apiExterna', 'true');
    return this._http.get(api);
  }
  buscaMedicamento(
    filter: { medicamento: string } = { medicamento: '' },
    page = 1
  ): Observable<any> {
    return this._http
      .get(`${this.apiBaseUrl}/busca/medicamento/${filter.medicamento}`)
      .pipe(
        tap((response: any[]) => {
          response.map((medicamento) => medicamento);
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          // .filter((user) => user.modelo.includes(filter.modelo));

          return response;
        })
      );
  }
  procedimentoPsicologico(): Observable<any> {
    return this._http.get(`${this.apiBaseUrl}/procedimentopsicologico`);
  }
  motivoSaida(): Observable<any> {
    return this._http.get(`${this.apiBaseUrl}/motivosaida`);
  }
  tipoConsulta(): Observable<any> {
    return this._http.get(`${this.apiBaseUrl}/tipoconsulta`);
  }
  pertenceAcolhido(): Observable<any> {
    return this._http.get(`${this.apiBaseUrl}/pertenceacolhido`);
  }
  convenio() {
    return this._http.get(`${this.apiBaseUrl}/convenio`);
  }
  buscaDoenca(
    filter: { doenca: string } = { doenca: '' },
    page = 1
  ): Observable<any> {
    return this._http
      .get(`${this.apiBaseUrl}/busca/doenca/${filter.doenca}`)
      .pipe(
        tap((response: any[]) => {
          console.log(response);
          response.map((doenca) => doenca);
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          // .filter((user) => user.modelo.includes(filter.modelo));

          return response;
        })
      );
  }
  read(path = '') {
    return this._http.get(`${this.apiBaseUrl}/prontuario/${path}`);
  }

  readCollection(collection) {
    return this._http.get(`${this.apiBaseUrl}/${collection}`);
  }

  readById(path, document, array: boolean = false) {
    return this._http.get(
      `${this.apiBaseUrl}/${path}/${document}?array=${array}`
    );
  }

  save(form, _id, path: string): Observable<any> {
    if (!path.includes('undefined')) {
      if (form[form.path]._id && form[form.path]._id != undefined) {
        return this._http.put(
          `${this.apiBaseUrl}/${path}/${form[form.path]._id}`,
          form
        );
      } else {
        return this._http.put(`${this.apiBaseUrl}/${path}`, form);
      }
    } else {
      return this._http.post(
        `${this.apiBaseUrl}/${path.slice(0, path.lastIndexOf('/'))}/${
          form.path
        }`,
        form
      );
    }
  }

  remove(path: string): Observable<any> {
    return this._http.delete(`${this.apiBaseUrl}/${path}`);
  }

  concluirTratamento(
    path,
    conclusao: {
      dataEgresso: Date;
      motivo: string;
    }
  ): Observable<any> {
    return this._http.post(`${this.apiBaseUrl}/${path}/concluir`, conclusao);
  }

  carregaDadosPsicoterapia(path, form: any): Observable<any> {
    return this._http.post(`${this.apiBaseUrl}/${path}/relatorio`, form);
  }
}
