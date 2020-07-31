import { Component, OnInit, Injector } from '@angular/core';

import { LivroDiarioFormComponent } from '../livro-diario-form/livro-diario-form.component';
import { AcolhimentoResource } from 'src/app/acolhimento/classes/acolhimento-resource';

@Component({
  selector: 'app-livro-diario-list',
  templateUrl: './livro-diario-list.component.html',
  styleUrls: ['./livro-diario-list.component.css'],
})
export class LivroDiarioListComponent extends AcolhimentoResource
  implements OnInit {
  constructor(injector: Injector) {
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
    this.montaTabela({
      columns,
      service: this.acolhimentoService.read('livrodiario'),
      component: LivroDiarioFormComponent,
      _id: undefined,
     // socketioPath: 'livrodiario',
     // caminho: 'livroDiario',
    });
    //this.socketioPath = 'livroDiario';
  }
}
