import { Component, OnInit, Injector } from '@angular/core';
import { AcolhimentoResource } from '../../classes/acolhimento-resource';

@Component({
  selector: 'app-rotina-diaria-form',
  templateUrl: './rotina-diaria-form.component.html',
  styleUrls: ['./rotina-diaria-form.component.css'],
})
export class RotinaDiariaFormComponent extends AcolhimentoResource
  implements OnInit {
  diaSemana: any[] = [
    {
      key: 'Segunda',
      value: 'Segunda-Feira',
    },
    {
      key: 'Terça',
      value: 'Terça-Feira',
    },
    {
      key: 'Quarta',
      value: 'Quarta-Feira',
    },
    {
      key: 'Quinta',
      value: 'Quinta-Feira',
    },
    {
      key: 'Sexta',
      value: 'Sexta-Feira',
    },
    {
      key: 'Sábado',
      value: 'Sábado',
    },
    {
      key: 'Domingo',
      value: 'Domingo',
    },
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      _id: undefined,
      path: 'rotinadiaria',
      horarioInicial: [''],
      horarioFinal: [''],
      atividade: [''],
      diaSemana: [''],
    });

    this._id !== undefined
      ? this.acolhimentoService
          .readById('rotinadiaria', this._id)
          .subscribe((res: any) => {
            console.log(res);
            this.form.patchValue(res);
          })
      : null;
    //  this.form.get('anotacoes').patchValue(this.diario);
  }
}
