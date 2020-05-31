import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';
import { EvolucaoPsicologicaFormComponent } from '../evolucao-psicologica-form/evolucao-psicologica-form.component';

@Component({
  selector: 'app-evolucao-psicologica-list',
  templateUrl: './evolucao-psicologica-list.component.html',
  styleUrls: ['./evolucao-psicologica-list.component.css'],
})
export class EvolucaoPsicologicaListComponent extends PasResource
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
    ];
    super.montaTabela(
      columns,
      this.pasService.readById('evolucaoPsicologica'),
      EvolucaoPsicologicaFormComponent,
      this._id
    );
  }
}
