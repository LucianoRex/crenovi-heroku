import { Component, OnInit, Injector } from '@angular/core';
import { MedicamentoFormComponent } from '../medicamento-form/medicamento-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-medicamento-list',
  templateUrl: './medicamento-list.component.html',
  styleUrls: ['./medicamento-list.component.css'],
})
export class MedicamentoListComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'medicamento.PRODUTO',
        label: 'Medicamento',
      },
      {
        name: 'posologia',
        label: 'Posologia',
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(this.concatenatedPath,'medicamento'),
      component: MedicamentoFormComponent,
      _id: this._id,
      socketioPath: 'medicamento',
      caminho: this.concatenatedPath + '/medicamento',
    });
  }
}
