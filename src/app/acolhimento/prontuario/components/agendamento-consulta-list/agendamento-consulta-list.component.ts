import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { AgendamentoConsultaFormComponent } from '../agendamento-consulta-form/agendamento-consulta-form.component';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';

@Component({
  selector: 'app-agendamento-consulta-list',
  templateUrl: './agendamento-consulta-list.component.html',
  styleUrls: ['./agendamento-consulta-list.component.css'],
})
export class AgendamentoConsultaListaComponent extends ProntuarioResource
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
        name: 'tipo.tipo',
        label: 'Tipo',
      },
      {
        name: 'consultaEfetuada',
        label: 'Efetuada',
        type: FieldType.boolean,
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(
        this.concatenatedPath,
        'agendamentoconsulta',
        true
      ),
      component: AgendamentoConsultaFormComponent,
      _id: this._id,    
      //socketioPath: 'agendamentoconsulta',
      caminho: this.concatenatedPath + '/agendamentoconsulta',
    });
  }
}
