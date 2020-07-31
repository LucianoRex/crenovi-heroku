import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acolhido } from 'src/app/acolhimento/prontuario/models/prontuario';
import { Colaborador } from '../models/colaborador';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  apiBaseUrl = environment.apiBaseUrl;
  pas_id: string;
  constructor(private _http: HttpClient) {}

  getColaboradores(): Observable<Colaborador[]> {
    return this._http.get<Colaborador[]>(
      `${this.apiBaseUrl}/colaborador/colaborador/`
    );
  }

  getColaboradorById(payload: any): Observable<Colaborador> {
    return this._http.get<Colaborador>(
      `${this.apiBaseUrl}/colaborador/colaborador/${payload}`
    );
  }

  createColaborador(payload: Colaborador): Observable<Colaborador> {
    return this._http.post<Colaborador>(
      `${this.apiBaseUrl}/colaborador/colaborador/`,
      payload
    );
  }

  updateColaborador(colaborador: Colaborador): Observable<Colaborador> {
    return this._http.put<Colaborador>(
      `${this.apiBaseUrl}/colaborador/colaborador/${colaborador['_id']}`,
      colaborador
    );
  }
  deleteColaborador(payload: any) {
    return this._http.delete(`${this.apiBaseUrl}/colaborador/${payload}`);
  }
  /*
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
  */
}
