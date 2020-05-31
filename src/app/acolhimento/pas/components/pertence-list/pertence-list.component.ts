import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';
import { PertenceFormComponent } from '../pertence-form/pertence-form.component';

@Component({
  selector: 'app-pertence-list',
  templateUrl: './pertence-list.component.html',
  styleUrls: ['./pertence-list.component.css'],
})
export class PertenceListComponent extends PasResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [
      {
        name: 'pertence',
        label: 'Pertence',
      },
      {
        name: 'quantidade',
        label: 'Quantidade',
      },
    ];
    super.montaTabela(
      columns,
      this.pasService.readById('pertence'),
      PertenceFormComponent,
      this._id
    );
  }
}
