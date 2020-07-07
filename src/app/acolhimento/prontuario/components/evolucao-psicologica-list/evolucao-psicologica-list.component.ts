import { Component, OnInit, Injector } from '@angular/core';
import { EvolucaoPsicologicaFormComponent } from '../evolucao-psicologica-form/evolucao-psicologica-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';

@Component({
  selector: 'app-evolucao-psicologica-list',
  templateUrl: './evolucao-psicologica-list.component.html',
  styleUrls: ['./evolucao-psicologica-list.component.css'],
})
export class EvolucaoPsicologicaListComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns: IDynamicTableBuilder[] = [
      {
        name: 'dataI',
        label: 'Data Inicial',
        type: FieldType.date,
      },
      {
        name: 'dataF',
        label: 'Data Final',
        type: FieldType.date,
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(
        this.concatenatedPath,
        'evolucaoPsicologica',
        true
      ),
      component: EvolucaoPsicologicaFormComponent,
      _id: this._id,
      //socketioPath: 'evolucaoPsicologica',
      caminho: this.concatenatedPath + '/evolucaoPsicologica',
    });
  }
}
