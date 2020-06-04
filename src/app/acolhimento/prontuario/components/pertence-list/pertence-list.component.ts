import { Component, OnInit, Injector } from '@angular/core';
import { PertenceFormComponent } from '../pertence-form/pertence-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-pertence-list',
  templateUrl: './pertence-list.component.html',
  styleUrls: ['./pertence-list.component.css'],
})
export class PertenceListComponent extends ProntuarioResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'pertence',
        label: 'Pertence',
      },
      {
        name: 'quantidade',
        label: 'Quantidade',
      },
    ];
    super.montaTabela(
      columns,
      this.prontuarioService.readById('pertence'),
      PertenceFormComponent,
      this._id
    );
  }
}
