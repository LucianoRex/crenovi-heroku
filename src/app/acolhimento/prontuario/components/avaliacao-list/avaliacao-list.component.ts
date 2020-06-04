import { Component, OnInit, Injector } from '@angular/core';
import { AvaliacaoFormComponent } from '../avaliacao-form/avaliacao-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-avaliacao-list',
  templateUrl: './avaliacao-list.component.html',
  styleUrls: ['./avaliacao-list.component.css'],
})
export class AvaliacaoListComponent extends ProntuarioResource implements OnInit {
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
    super.montaTabela(
      columns,
      this.prontuarioService.readById('avaliacao'),
      AvaliacaoFormComponent,
      this._id
    );
  }
}
