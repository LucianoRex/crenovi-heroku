import { Component, OnInit, Injector } from '@angular/core';
import { PertenceFormComponent } from '../pertence-form/pertence-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { IDynamicTableBuilder } from 'src/app/shared/utils/interfaces/dynamic-table-builder';

@Component({
  selector: 'app-pertence-list',
  templateUrl: './pertence-list.component.html',
  styleUrls: ['./pertence-list.component.css'],
})
export class PertenceListComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns:IDynamicTableBuilder[] = [
      {
        name: 'item',
        label: 'Item',
      },
      {
        name: 'quantidade',
        label: 'Quantidade',
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(this.concatenatedPath,'pertence',true),
      component: PertenceFormComponent,
      _id: this._id,
     // socketioPath: 'pertence',
      caminho: this.concatenatedPath + '/pertence',
    });
  }
}
