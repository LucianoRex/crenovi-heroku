import { Component, OnInit, Injector } from '@angular/core';
import { PasFormComponent } from '../pas-form/pas-form.component';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-pas-list',
  templateUrl: './pas-list.component.html',
  styleUrls: ['./pas-list.component.css'],
})
export class PasListComponent extends PasResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'ativo',
        label: 'Em acolhimento',
        type: 'boolean',
      },
      {
        name: 'identificacao.acolhido.nome',
        label: 'Acolhido',
      },
      {
        name: 'identificacao.dataIngresso',
        label: 'Data Ingresso',
        type: 'date',
      },
      {
        name: 'identificacao.convenio',
        label: 'Convênio',
      },
      {
        name: 'identificacao.periodo',
        label: 'Período',
        complemento: ' Meses',
      },
    ];

    this.montaTabela(
      columns,
      this.pasService.read(),
      PasFormComponent,
      undefined,
      'pas'
    );
  }
}
