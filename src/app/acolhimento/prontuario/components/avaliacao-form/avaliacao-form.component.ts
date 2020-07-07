import { Component, OnInit, Injector, Input } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-avaliacao-form',
  templateUrl: './avaliacao-form.component.html',
  styleUrls: ['./avaliacao-form.component.css'],
})
export class AvaliacaoFormComponent extends ProntuarioResource
  implements OnInit {
  //  @Input() _id: string;
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
    console.log(this._id)
    this.form = this.fb.group({
      path: 'avaliacao',
      array:true,
      avaliacao: this.fb.group({
        _id: undefined,
        data: ['', Validators.required],
        disciplina: ['', Validators.minLength(0)],
        autoestima: ['', Validators.minLength(0)],
        reunioes: ['', Validators.minLength(0)],
        espiritualidade: ['', Validators.minLength(0)],
        higiene: ['', Validators.minLength(0)],
        criatividade: ['', Validators.minLength(0)],
        observacoes: ['', Validators.minLength(0)],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('avaliacao').patchValue(res);
          })
      : null;
    this.form.valueChanges.subscribe((e) => {
      this.formChange.emit(true);
    });
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }
}
