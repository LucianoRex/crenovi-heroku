import { Component, OnInit, Injector } from '@angular/core';
import { EvolucaoPsicologicaFormComponent } from '../evolucao-psicologica-form/evolucao-psicologica-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

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
    let columns = [
      {
        name: 'dataI',
        label: 'Data Inicial',
        type: 'date',
      },
      {
        name: 'dataF',
        label: 'Data Final',
        type: 'date',
      },
    ];
    super.montaTabela(
      columns,
      this.prontuarioService.readById('evolucaoPsicologica'),
      EvolucaoPsicologicaFormComponent,
      this._id
    );
  }
}
