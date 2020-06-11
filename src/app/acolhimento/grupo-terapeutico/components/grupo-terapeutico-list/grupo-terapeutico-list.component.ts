import { Component, OnInit, Injector } from '@angular/core';
import { GrupoTerapeuticoResource } from '../../classes/grupo-terapeutico-resource';
import { GrupoTerapeuticoFormComponent } from '../grupo-terapeutico-form/grupo-terapeutico-form.component';

@Component({
  selector: 'app-grupo-terapeutico-list',
  templateUrl: './grupo-terapeutico-list.component.html',
  styleUrls: ['./grupo-terapeutico-list.component.css'],
})
export class GrupoTerapeuticoListComponent extends GrupoTerapeuticoResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'nome',
        label: 'Grupo',
      },
    ];

    this.montaTabela(
      { columns, service: this.grupoTerapeuticoService.read(), component: GrupoTerapeuticoFormComponent, _id: undefined, socketioPath: 'pas' }    );
  }
}
