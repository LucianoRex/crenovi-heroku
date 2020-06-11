import { Component, OnInit, Injector } from '@angular/core';
import { SaidaFormComponent } from '../saida-form/saida-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-saida-list',
  templateUrl: './saida-list.component.html',
  styleUrls: ['./saida-list.component.css'],
})
export class SaidaListComponent extends ProntuarioResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'saida',
        label: 'Saída',
        type: 'date',
      },
      {
        name: 'retorno',
        label: 'Retorno',
        type: 'date',
      },
    ];
    super.montaTabela({
      columns: columns,
      service: this.prontuarioService.readById(this.concatenatedPath,'saida'),
      component: SaidaFormComponent,
      _id: this._id,
      socketioPath: 'saida',
      caminho: this.concatenatedPath + '/saida',
    });
  }
}
