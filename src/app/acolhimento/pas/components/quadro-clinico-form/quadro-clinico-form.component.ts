import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-quadro-clinico-form',
  templateUrl: './quadro-clinico-form.component.html',
  styleUrls: ['./quadro-clinico-form.component.css'],
})
export class QuadroClinicoFormComponent extends PasResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }
  panelOpenState = false;
  ngOnInit(): void {
    this.form = this.fb.group({
      path: `quadroClinico`,
      quadroClinico: this.fb.group({
        _id: undefined,
        familiar: [false],
        cessarUso: [false],
        observacoes: [''],
        abstinencia: this.fb.group({
          tremor: false,
          nausea: false,
          sudorese: false,
          oscilacaoHumor: false,
          cefaleia: false,
          caimbra: false,
          diarreia: false,
          irritabilidade: false,
          agressividade: false,
          insonia: false,
          fissura: false,
        }),
      }),
    });
    this._id !== undefined
      ? this.pasService.readById('quadroClinico').subscribe((res) => {
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }
}
