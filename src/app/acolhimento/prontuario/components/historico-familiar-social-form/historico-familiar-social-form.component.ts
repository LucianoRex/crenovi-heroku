import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';


@Component({
  selector: 'app-historico-familiar-social-form',
  templateUrl: './historico-familiar-social-form.component.html',
  styleUrls: ['./historico-familiar-social-form.component.css'],
})
export class HistoricoFamiliarSocialFormComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `historicoFamiliarSocial`,
      historicoFamiliarSocial: this.fb.group({
        resideFamiliar: [false],
        situacaoRua: [false],
        filhos: [''],
        estadoCivil: [''],
        conjuge: [''],
        vinculoFamiliar: [''],
        casaPropria: [false],
        empregado: [false],
        profissao: [''],
        religiao: [''],
        beneficio: [false],
        amigoUsuario: [false],
        escolaridade: [''],
        problemaTrabalho: [''],
        lazer: [''],
        filho: [''],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById('historicoFamiliarSocial')
          .subscribe((res) => {
            this.form.patchValue(res);
          })
      : null;
    this.notify.emit(this.form);

  }
}
