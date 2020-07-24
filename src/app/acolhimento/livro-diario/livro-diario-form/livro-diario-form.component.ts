import { Component, OnInit, Injector } from '@angular/core';
import { AcolhimentoResource } from '../../classes/acolhimento-resource';

@Component({
  selector: 'app-livro-diario-form',
  templateUrl: './livro-diario-form.component.html',
  styleUrls: ['./livro-diario-form.component.css'],
})
export class LivroDiarioFormComponent extends AcolhimentoResource
  implements OnInit {
  diario = `  06h30min - Despertar;
  07h - Café da manhã;
  07h30min Devocional;
  08h - Inicio Atividades de laborterapia;
  11h - R.I.M.;
  12h - Almoço,Descanço;
  13h30min - Despertar;
  `;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: undefined,
      path: 'livrodiario',
      data: [''],
      anotacoes: [''],
    });

    this._id !== undefined
      ? this.acolhimentoService
          .readById('livrodiario', this._id)
          .subscribe((res: any) => {
            this.form.patchValue(res);
          })
      : this.form.get('data').patchValue(new Date());
    this.form.get('anotacoes').patchValue(this.diario);
  }
}
