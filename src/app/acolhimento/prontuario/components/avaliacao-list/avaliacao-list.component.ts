import { Component, OnInit, Injector } from '@angular/core';
import { AvaliacaoFormComponent } from '../avaliacao-form/avaliacao-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';

@Component({
  selector: 'app-avaliacao-list',
  templateUrl: './avaliacao-list.component.html',
  styleUrls: ['./avaliacao-list.component.css'],
})
export class AvaliacaoListComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns: IDynamicTableBuilder[] = [
      {
        name: 'data',
        label: 'Data',
        type: FieldType.date,
      },
      {
        name: 'disciplina',
        label: 'Disciplina',
      },
      {
        name: 'autoestima',
        label: 'Autoestima',
      },
      {
        name: 'reunioes',
        label: 'Reuniões',
      },
      {
        name: 'espiritualidade',
        label: 'Espiritualidade',
      },
      {
        name: 'higiene',
        label: 'Higiene',
      },
      {
        name: 'criatividade',
        label: 'Criatividade',
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(
        this.concatenatedPath,
        'avaliacao',
        true
      ),
      component: AvaliacaoFormComponent,
      _id: this._id,
      //socketioPath: 'avaliacao',
      caminho: this.concatenatedPath + '/avaliacao',
    });
  }
}
