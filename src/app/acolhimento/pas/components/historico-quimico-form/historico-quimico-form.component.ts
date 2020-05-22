import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-historico-quimico-form',
  templateUrl: './historico-quimico-form.component.html',
  styleUrls: ['./historico-quimico-form.component.css'],
})
export class HistoricoQuimicoFormComponent extends PasResource
  implements OnInit {
  //@Output() notify = new EventEmitter();
  //apiUrl = environment.apiBaseUrl;

  substancias: any[] = [
    {
      value: 'alcool',
      name: 'Álcool',
    },
    {
      value: 'maconha',
      name: 'Maconha',
    },
    {
      value: 'cocaina',
      name: 'Cocaína',
    },
    {
      value: 'crack',
      name: 'Crack',
    },
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      //_id: undefined,
      path: 'historicoQuimico',
      historicoQuimico: this.fb.group({
        _id: undefined,
        idade: [''],
        substancia: [''],
      }),
    });
    this._id !== undefined
      ? this.pasService
          .readById('historicoQuimico', this._id)
          .subscribe((res: any) => {
            this.form.get('biometria').patchValue(res);
          })
      : null;
  }
}
