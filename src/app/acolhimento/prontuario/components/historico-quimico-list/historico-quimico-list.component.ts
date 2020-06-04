import { Component, OnInit, Injector } from '@angular/core';
import { HistoricoQuimicoFormComponent } from '../historico-quimico-form/historico-quimico-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-historico-quimico-list',
  templateUrl: './historico-quimico-list.component.html',
  styleUrls: ['./historico-quimico-list.component.css'],
})
export class HistoricoQuimicoListComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'idade',
        label: 'Idade',
      },
      {
        name: 'substancia.nome',
        label: 'Substância',
      },
    ];
    super.montaTabela(
      columns,
      this.prontuarioService.readById('historicoQuimico'),
      HistoricoQuimicoFormComponent,
      this._id
    );
  }
}
