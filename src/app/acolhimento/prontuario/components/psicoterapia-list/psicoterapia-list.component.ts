import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { PsicoterapiaFormComponent } from '../psicoterapia-form/psicoterapia-form.component';
import { IDynamicTableBuilder, FieldType } from 'src/app/shared/utils/interfaces/dynamic-table-builder';

@Component({
  selector: 'app-psicoterapia-list',
  templateUrl: './psicoterapia-list.component.html',
  styleUrls: ['./psicoterapia-list.component.css'],
})
export class PsicoterapiaListComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns:IDynamicTableBuilder[] = [
      {
        name: 'data',
        label: 'Data',
        type: FieldType.date,
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(
        this.concatenatedPath,
        'psicoterapia'
      ),
      component: PsicoterapiaFormComponent,
      _id: this._id,
      socketioPath: 'psicoterapia',
      caminho: this.concatenatedPath + '/psicoterapia',
    });
  }
}
