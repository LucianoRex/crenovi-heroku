import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { AgendamentoConsultaFormComponent } from '../agendamento-consulta-form/agendamento-consulta-form.component';

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
    let columns = [
      {
        name: 'data',
        label: 'Data',
        type: 'date',
      },
      {
        name: 'tipo',
        label: 'Tipo',
      },
      {
        name: 'consultaEfetuada',
        label: 'Efetuada',
        type: 'boolean',
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(this.concatenatedPath,'agendamentoconsulta'),
      component: AgendamentoConsultaFormComponent,
      _id: this._id,
      socketioPath: 'agendamentoconsulta',
      caminho: this.concatenatedPath + '/agendamentoconsulta',
    });
  }
}
