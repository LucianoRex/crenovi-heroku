import { Component, OnInit, Injector } from '@angular/core';

import { DoencaFormComponent } from '../doenca-form/doenca-form.component';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-doenca-list',
  templateUrl: './doenca-list.component.html',
  styleUrls: ['./doenca-list.component.css'],
})
export class DoencaListComponent extends PasResource implements OnInit {
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
    super.montaTabela(
      columns,
      this.pasService.readById('doenca'),
      DoencaFormComponent,    
      this._id
    );
  }
}
