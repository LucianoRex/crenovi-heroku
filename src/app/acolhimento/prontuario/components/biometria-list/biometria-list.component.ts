import { Component, OnInit, Injector } from '@angular/core';

import { BiometriaFormComponent } from '../biometria-form/biometria-form.component';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-biometria-list',
  templateUrl: './biometria-list.component.html',
  styleUrls: ['./biometria-list.component.css'],
})
export class BiometriaListComponent extends ProntuarioResource
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
      {
        name: 'pa',
        label: 'P.A.',
      },
    ];

    super.montaTabela({
      columns,
      service: this.prontuarioService.readById(
        this.concatenatedPath,
        'biometria'
      ),
      component: BiometriaFormComponent,
      _id: this._id,
      socketioPath: 'biometria',
      caminho: this.concatenatedPath + '/biometria',
    });
    
  }
}
