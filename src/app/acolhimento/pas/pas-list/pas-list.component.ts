import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../classes/pas-resource';
import { PasFormComponent } from '../pas-form/pas-form.component';

@Component({
  selector: 'app-pas-list',
  templateUrl: './pas-list.component.html',
  styleUrls: ['./pas-list.component.css']
})
export class PasListComponent extends PasResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: '_id',
        label: 'ID',
      },
      {
        name: 'identificacao.dataIngresso',
        label: 'Data Ingresso',
      },
      {
        name: 'identificacao.convenio',
        label: 'Convênio',
      },
      {
        name: 'identificacao.periodo',
        label: 'Período',
      },
    ];
    this.montaTabela(columns, this.pasService.read(), PasFormComponent);
  }
}
