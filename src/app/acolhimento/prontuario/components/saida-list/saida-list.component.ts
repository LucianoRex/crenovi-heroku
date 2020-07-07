import { Component, OnInit, Injector } from '@angular/core';
import { SaidaFormComponent } from '../saida-form/saida-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';

@Component({
  selector: 'app-saida-list',
  templateUrl: './saida-list.component.html',
  styleUrls: ['./saida-list.component.css'],
})
export class SaidaListComponent extends ProntuarioResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns: IDynamicTableBuilder[] = [
      {
        name: 'saida',
        label: 'Saída',
        type: FieldType.date,
      },
      {
        name: 'retorno',
        label: 'Retorno',
        type: FieldType.date,
      },
      {
        name: 'motivo.motivo',
        label: 'Motivo',
      },
    ];
    super.montaTabela({
      columns: columns,
      service: this.prontuarioService.readById(
        this.concatenatedPath,
        'saida',
        true
      ),
      component: SaidaFormComponent,
      _id: this._id,
      // socketioPath: 'saida',
      caminho: this.concatenatedPath + '/saida',
    });
  }
}
