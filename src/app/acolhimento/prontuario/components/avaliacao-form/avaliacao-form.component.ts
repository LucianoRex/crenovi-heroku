import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';


@Component({
  selector: 'app-avaliacao-form',
  templateUrl: './avaliacao-form.component.html',
  styleUrls: ['./avaliacao-form.component.css'],
})
export class AvaliacaoFormComponent extends ProntuarioResource implements OnInit {
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      //_id: undefined,
      path: 'avaliacao',
      avaliacao: this.fb.group({
        _id: undefined,
        data: [''],
        disciplina: [''],
        autoestima: [''],
        reunioes: [''],
        espiritualidade: [''],
        higiene: [''],
        criatividade: [''],
        observacoes: [''],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById('avaliacao', this._id)
          .subscribe((res: any) => {
            this.form.get('avaliacao').patchValue(res);
          })
      : null;
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
