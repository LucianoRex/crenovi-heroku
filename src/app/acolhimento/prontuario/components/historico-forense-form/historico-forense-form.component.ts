import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-historico-forense-form',
  templateUrl: './historico-forense-form.component.html',
  styleUrls: ['./historico-forense-form.component.css'],
})
export class HistoricoForenseFormComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `historicoForense`,
      historicoForense: this.fb.group({
        _id: 'historicoForense',
        cometeuDelito: [false],
        foiDetido: [false],
        respondeProcessoJudicial: [false],
        observacoes: [''],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService.readById(this.concatenatedPath,'historicoForense').subscribe((res) => {
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }
}
