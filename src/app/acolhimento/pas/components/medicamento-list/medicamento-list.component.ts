import { Component, OnInit, Injector } from '@angular/core';
import { MedicamentoFormComponent } from '../medicamento-form/medicamento-form.component';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-medicamento-list',
  templateUrl: './medicamento-list.component.html',
  styleUrls: ['./medicamento-list.component.css'],
})
export class MedicamentoListComponent extends PasResource implements OnInit {
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
    super.montaTabela(
      columns,
      this.pasService.readById('medicamento'),
      MedicamentoFormComponent,      
      this._id
    );
  }
}
