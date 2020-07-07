import { Component, OnInit, Injector } from '@angular/core';

import { BiometriaFormComponent } from '../biometria-form/biometria-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';

@Component({
  selector: 'app-biometria-list',
  templateUrl: './biometria-list.component.html',
  styleUrls: ['./biometria-list.component.css'],
})
export class BiometriaListComponent extends ProntuarioResource
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
        name: 'altura',
        label: 'Altura',
        type: FieldType.pattern,
        pattern: '0.00',
      },
      {
        name: 'peso',
        label: 'Peso',
      },
      {
        name: 'pa',
        label: 'P.A.',
        type: FieldType.pattern,
        pattern: '000/00',
      },
      {
        name: 'glicemia',
        label: 'Glicemia',
      },
    ];

    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(
        this.concatenatedPath,
        'biometria',
        true
      ),
      component: BiometriaFormComponent,
      _id: this._id,
      //socketioPath: 'biometria',
      caminho: this.concatenatedPath + '/biometria',
    });
  }
}
