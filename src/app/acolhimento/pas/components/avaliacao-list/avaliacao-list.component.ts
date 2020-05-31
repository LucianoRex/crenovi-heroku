import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';
import { AvaliacaoFormComponent } from '../avaliacao-form/avaliacao-form.component';

@Component({
  selector: 'app-avaliacao-list',
  templateUrl: './avaliacao-list.component.html',
  styleUrls: ['./avaliacao-list.component.css'],
})
export class AvaliacaoListComponent extends PasResource implements OnInit {
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
      this.pasService.readById('avaliacao'),
      AvaliacaoFormComponent,
      this._id
    );
  }
}
