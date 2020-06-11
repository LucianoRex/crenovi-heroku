import { Component, OnInit, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Validators } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-saida-form',
  templateUrl: './saida-form.component.html',
  styleUrls: ['./saida-form.component.css'],
})
export class SaidaFormComponent extends ProntuarioResource implements OnInit {
  apiUrl = environment.apiBaseUrl;

  constructor(protected injector: Injector) {
    super(injector);
  }
  motivos: any[] = ['Ressocialização', 'Consulta'];
  ngOnInit(): void {
    this.form = this.fb.group({
      //_id: undefined,
      path: 'saida',
      saida: this.fb.group({
        _id: undefined,
        saida: [''],
        retorno: [''],
        motivo: [''],
        responsavel: [''],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService.readById(this.concatenatedPath, this._id).subscribe((res: any) => {
          this.form.get('saida').patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }
}
