import { Component, OnInit, Injector } from '@angular/core';
import { ColaboradorResource } from '../../classes/colaborador-resource';
import { ColaboradorFormComponent } from '../colaborador-form/colaborador-form.component';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css'],
})
export class ColaboradorListComponent extends ColaboradorResource
  implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'nome',
        label: 'Nome',
      },
      {
        name: 'telefone',
        label: 'Telefone',
        type: 'phone',
      },
      {
        name: 'funcao',
        label: 'Função',
      },
    ];
    this.montaTabela(
      columns,
      this.colaboradorService.read('colaborador'),
      ColaboradorFormComponent
    );
  }
}
