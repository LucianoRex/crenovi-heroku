import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { ProntuarioFormComponent } from '../prontuario-form/prontuario-form.component';

@Component({
  selector: 'app-prontuario-list',
  templateUrl: './prontuario-list.component.html',
  styleUrls: ['./prontuario-list.component.css'],
})
export class ProntuarioListComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.concatenatedPath = 'prontuario';
    let columns = [
      {
        name: 'ativo',
        label: 'Em acolhimento',
        type: 'boolean',
      },
      {
        name: 'identificacao.acolhido.nome',
        label: 'Acolhido',
      },
      {
        name: 'identificacao.dataIngresso',
        label: 'Data Ingresso',
        type: 'date',
      },
      {
        name: 'identificacao.convenio',
        label: 'Convênio',
      },
      {
        name: 'identificacao.periodo',
        label: 'Período',
        complemento: ' Meses',
      },
    ];

    this.montaTabela({
      columns: columns,
      service: this.prontuarioService.read(),
      component: ProntuarioFormComponent,
      _id: undefined,
      socketioPath: 'identificacao',
      caminho: 'prontuario',
    });
  }
}
