import { Component, OnInit, Injector } from '@angular/core';
import { HistoricoQuimicoFormComponent } from '../historico-quimico-form/historico-quimico-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { IDynamicTableBuilder } from 'src/app/shared/utils/interfaces/dynamic-table-builder';

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
    let columns:IDynamicTableBuilder[] = [
      {
        name: 'idade',
        label: 'Idade',
      },
      {
        name: 'substancia.nome',
        label: 'Substância',
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(this.concatenatedPath,'historicoQuimico',true),
      component: HistoricoQuimicoFormComponent,
      _id: this._id,
     // socketioPath: 'historicoQuimico',
      caminho: this.concatenatedPath + '/historicoQuimico',
      title:'Histórico Químico'
    });
  }
}
