import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-historico-quimico-form',
  templateUrl: './historico-quimico-form.component.html',
  styleUrls: ['./historico-quimico-form.component.css'],
})
export class HistoricoQuimicoFormComponent extends ProntuarioResource
  implements OnInit {
  //@Output() notify = new EventEmitter();
  //apiUrl = environment.apiBaseUrl;

  substancias: any[];
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.prontuarioService
      .readCollection('substancia')
      .subscribe((res: any) => {
        console.log(res);
        this.substancias = res;
      });

    this.form = this.fb.group({
      //_id: undefined,
      path: 'historicoQuimico',
      historicoQuimico: this.fb.group({
        _id: undefined,
        idade: [''],
        substancia: [''],
        diario: [false],
        observacoes: [''],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('historicoQuimico').patchValue(res);
          })
      : null;
  }
}
