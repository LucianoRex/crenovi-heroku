import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-tratamento-form',
  templateUrl: './tratamento-form.component.html',
  styleUrls: ['./tratamento-form.component.css'],
})
export class TratamentoFormComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `tratamento`,
      tratamento: this.fb.group({
        desintoxicacao: [false],
        reducaoDano: [false],
        grupoApoio: [false],
        ct: [false],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, 'tratamento')
          .subscribe((res) => {
            this.form.patchValue(res);
          })
      : null;
    this.notify.emit(this.form);
  }
}
