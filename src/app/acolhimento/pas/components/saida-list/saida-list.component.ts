import { Component, OnInit, Injector } from '@angular/core';
import { SaidaFormComponent } from '../saida-form/saida-form.component';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-saida-list',
  templateUrl: './saida-list.component.html',
  styleUrls: ['./saida-list.component.css'],
})
export class SaidaListComponent extends PasResource implements OnInit {
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
    super.montaTabela(
      columns,
      this.pasService.readById('saida'),
      SaidaFormComponent,      
      this._id
    );
  }
}
