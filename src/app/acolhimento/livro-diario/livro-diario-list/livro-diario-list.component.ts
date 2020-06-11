import { Component, OnInit, Injector } from '@angular/core';
import { AcolhimentoResource } from '../../classes/acolhimento-resource';
import { AcolhimentoService } from '../../services/acolhimento.service';
import { LivroDiarioFormComponent } from '../livro-diario-form/livro-diario-form.component';

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
      socketioPath: 'livrodiario',
     // caminho: 'prontuario',
    });
    //this.socketioPath = 'livroDiario';
  }
}
