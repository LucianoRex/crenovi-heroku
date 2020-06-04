import { Component, OnInit, Injector } from '@angular/core';

import { AcolhidoFormComponent } from '../acolhido-form/acolhido-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';


@Component({
  selector: 'app-acolhido-list',
  templateUrl: './acolhido-list.component.html',
  styleUrls: ['./acolhido-list.component.css'],
})
export class AcolhidoListComponent extends ProntuarioResource implements OnInit {
  //@Output() selecionado = new EventEmitter<any>();
  columns;
  dataSource;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'nome',
        label: 'Nome',
      },
      {
        name: 'dataNasc',
        label: 'Data de Nasc.',
        type: 'date',
      },
      {
        name: 'cpf',
        label: 'CPF',
      },
      {
        name: 'rg',
        label: 'RG',
      },
    ];
    this.montaTabela(
      columns,
      this.prontuarioService.read('acolhido'),
      AcolhidoFormComponent
    );
  }
}
