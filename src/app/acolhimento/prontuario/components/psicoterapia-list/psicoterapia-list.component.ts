import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { PsicoterapiaFormComponent } from '../psicoterapia-form/psicoterapia-form.component';

@Component({
  selector: 'app-psicoterapia-list',
  templateUrl: './psicoterapia-list.component.html',
  styleUrls: ['./psicoterapia-list.component.css']
})
export class PsicoterapiaListComponent extends ProntuarioResource
implements OnInit {
constructor(protected injector: Injector) {
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
  super.montaTabela(
    columns,
    this.prontuarioService.readById('psicoterapia'),
    PsicoterapiaFormComponent,
    this._id
  );
}
}
