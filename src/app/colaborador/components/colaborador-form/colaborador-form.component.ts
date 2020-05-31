import { Component, OnInit, Injector } from '@angular/core';
import { ColaboradorResource } from '../../classes/colaborador-resource';

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.css'],
})
export class ColaboradorFormComponent extends ColaboradorResource
  implements OnInit {
  funcoes: any[] = ['Monitor', 'Psicólogo', 'Assistente Social'];

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: undefined,
      path: 'colaborador',
      nome: [''],
      cpf: [''],
      telefone: [''],
      email: [''],
      funcao: [''],
    });

    this._id !== undefined
      ? this.colaboradorService
          .readById('colaborador', this._id)
          .subscribe((res: any) => {
            console.log(res);
            this.form.patchValue(res);
          })
      : null;
  }
}
