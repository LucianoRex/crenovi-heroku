import { Component, OnInit, Injector } from '@angular/core';
import { AcolhidoResource } from '../../classes/acolhido-resource';
import { AcolhidoFormComponent } from '../acolhido-form/acolhido-form.component';
import { IDynamicFormTable } from 'src/app/shared/utils/classes/dynamic-form-table-resource';

@Component({
  selector: 'app-acolhido-list',
  templateUrl: './acolhido-list.component.html',
  styleUrls: ['./acolhido-list.component.css'],
})
export class AcolhidoListComponent extends AcolhidoResource implements OnInit {
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
    let tela: IDynamicFormTable = {
      columns: columns,
      service: this.acolhidoService.read(''),
      component: AcolhidoFormComponent,
      title: 'Acolhidos',
      caminho: '',
      enableRemove:true
    };

    this.montaTabela(tela);
  }
}
