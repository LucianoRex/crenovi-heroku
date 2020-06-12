import { Component, OnInit, Injector, Input } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-pertence-form',
  templateUrl: './pertence-form.component.html',
  styleUrls: ['./pertence-form.component.css'],
})
export class PertenceFormComponent extends ProntuarioResource
  implements OnInit {
  @Input() _id: string;
  itens: any[] = [
    'RG',
    'CPF',
    'Carteira de Trabalho',
    'Carteira de Motorista',
    'Cueca',
    'Meia',
    'Tênis',
    'Sapato',
    'Calça',
    'Camisa',
    'Camiseta',
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  //  console.log(this._id);
    this.form = this.fb.group({
      //_id: undefined,
      path: 'pertence',
      pertence: this.fb.group({
        _id: undefined,
        pertence: [''],
        quantidade: ['1'],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('pertence').patchValue(res);
          })
      : null;
  }
}
