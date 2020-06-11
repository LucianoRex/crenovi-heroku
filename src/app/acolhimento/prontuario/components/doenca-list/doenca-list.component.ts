import { Component, OnInit, Injector } from '@angular/core';

import { DoencaFormComponent } from '../doenca-form/doenca-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-doenca-list',
  templateUrl: './doenca-list.component.html',
  styleUrls: ['./doenca-list.component.css'],
})
export class DoencaListComponent extends ProntuarioResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'doenca.codigo',
        label: 'Código',
      },
      {
        name: 'doenca.nome',
        label: 'Nome',
      },
    ];
    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(this.concatenatedPath,'doenca'),
      component: DoencaFormComponent,
      _id: this._id,
      socketioPath: 'doenca',
      caminho: this.concatenatedPath + '/doenca',
    });
  }
}
