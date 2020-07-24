import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AcolhidoService {
  apiBaseUrl = environment.apiBaseUrl;
  private apiExterna: HttpClient;

  // pas_id: string;
  constructor(private _http: HttpClient,handler: HttpBackend) {this.apiExterna = new HttpClient(handler)}

  buscaApi(api): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('apiExterna', 'true');
    return this._http.get(api);
  }

  buscaCep(cep): Observable<any> {  
    return this.apiExterna.get(`https://viacep.com.br/ws/${cep.cep}/json/`);
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
    return this._http.post(`${this.apiBaseUrl}/${path}/concluir`, conclusao);
  }

  carregaDadosPsicoterapia(path, form: any): Observable<any> {
    return this._http.post(`${this.apiBaseUrl}/${path}/procedimentos`, form);
  }
  buscaOcupacao(
    filter: { ocupacao: string } = { ocupacao: '' },
    page = 1
  ): Observable<any> {
    return this._http
      .get(`${this.apiBaseUrl}/busca/ocupacao/${filter.ocupacao}`)
      .pipe(
        tap((response: any[]) => {
          response.map((ocupcao) => ocupcao);
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          // .filter((user) => user.modelo.includes(filter.modelo));

          return response;
        })
      );
  }
}
