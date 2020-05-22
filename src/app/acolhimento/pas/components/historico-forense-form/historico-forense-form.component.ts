import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-historico-forense-form',
  templateUrl: './historico-forense-form.component.html',
  styleUrls: ['./historico-forense-form.component.css'],
})
export class HistoricoForenseFormComponent extends PasResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `historicoForense`,
      historicoForense: this.fb.group({
        _id: undefined,
        cometeuDelito: [false],
        foiDetido: [false],
        respondeProcessoJudicial: [false],
        observacoes: [''],
      }),
    });
    this._id !== undefined
      ? this.pasService.readById('historicoForense').subscribe((res) => {
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }
}
