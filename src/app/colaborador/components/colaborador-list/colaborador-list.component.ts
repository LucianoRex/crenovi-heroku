import { Component, OnInit, Injector } from '@angular/core';
import { ColaboradorResource } from '../../classes/colaborador-resource';
import { ColaboradorFormComponent } from '../colaborador-form/colaborador-form.component';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';

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
    let columns: IDynamicTableBuilder[] = [
      {
        name: 'nome',
        label: 'Nome',
      },
      {
        name: 'telefone',
        label: 'Telefone',
        type: FieldType.phone,
      },
      {
        name: 'funcao',
        label: 'Função',
      },
    ];
    this.montaTabela({
      columns: columns,
      service: this.colaboradorService.read('colaborador'),
      component: ColaboradorFormComponent,
      //socketioPath: 'colaborador',
    });
  }
}
