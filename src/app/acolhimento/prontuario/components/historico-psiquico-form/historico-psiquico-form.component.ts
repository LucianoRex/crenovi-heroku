import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-historico-psiquico-form',
  templateUrl: './historico-psiquico-form.component.html',
  styleUrls: ['./historico-psiquico-form.component.css'],
})
export class HistoricoPsiquicoFormComponent extends ProntuarioResource
  implements OnInit {
  historicoPsiquico = {
    higienePessoal: {
      name: 'Higiene Pessoal',
      values: [
        { name: 'preservada', value: 'Preservada' },
        {
          name: 'desleixada',
          value: 'Desleixada',
        },
      ],
    },
    vestimenta: {
      name: 'Vestimenta',
      values: [
        {
          name: 'adequada',
          value: 'Adequada',
        },
        {
          name: 'inadequada',
          value: 'Inadequada',
        },
      ],
    },
    postura: {
      name: 'Postura',
      values: [
        {
          name: 'cooperativo',
          value: 'Cooperativo',
        },
        {
          name: 'submisso',
          value: 'Submisso',
        },
        {
          name: 'desconfiado',
          value: 'Desconfiado',
        },
        {
          name: 'apatico',
          value: 'Apático',
        },
        {
          name: 'indiferente',
          value: 'Indiferente',
        },
        {
          name: 'hostil',
          value: 'Hostil',
        },
        {
          name: 'irritado',
          value: 'Irritado',
        },
        {
          name: 'superioridade',
          value: 'Superioridade',
        },
        {
          name: 'bemhumorado',
          value: 'Bem Humorado',
        },
      ],
    },
    consciencia: {
      name: 'Consciência',
      values: [
        {
          name: 'consciente',
          value: 'Consciente',
        },
        {
          name: 'sonolento',
          value: 'Sonolento',
        },
        {
          name: 'efeito',
          value: 'Sob efeito',
        },
      ],
    },
    atencao: {
      name: 'Atenção',
      values: [
        {
          name: 'concetrado',
          value: 'Concentrado',
        },
        {
          name: 'desatento',
          value: 'Desatento',
        },
        {
          name: 'distraido',
          value: 'Distraído',
        },
      ],
    },
    memoria: {
      name: 'Memória',
      values: [
        {
          name: 'normal',
          value: 'Normal',
        },
        {
          name: 'deficit',
          value: 'Déficit',
        },
        {
          name: 'remota',
          value: 'Remota',
        },
        {
          name: 'recente',
          value: 'Recente',
        },
      ],
    },
    linguagem: {
      name: 'Pensamento',
      values: [
        {
          name: 'coerente',
          value: 'Coerente',
        },
        {
          name: 'pobre',
          value: 'Pobre',
        },
        {
          name: 'semgiria',
          value: 'Sem G´rias',
        },
        {
          name: 'monossilabica',
          value: 'Monossilábica',
        },
        {
          name: 'rica',
          value: 'Rica',
        },
        {
          name: 'prolixa',
          value: 'Prolixa',
        },
        {
          name: 'comgiria',
          value: 'Com Gíria',
        },
      ],
    },
    afeto: {
      name: 'Afeto',
      values: [
        {
          name: 'ressonante',
          value: 'Ressonante',
        },
        {
          name: 'embotado',
          value: 'Embotado',
        },
        {
          name: 'apatico',
          value: 'Apático',
        },
        {
          name: 'alegre',
          value: 'Alegre',
        },
        {
          name: 'triste',
          value: 'Triste',
        },
        {
          name: 'irritado',
          value: 'Irritado',
        },
      ],
    },
    humor: {
      name: 'Humor',
      values: [
        {
          name: 'eutimico',
          value: 'Eutímico',
        },
        {
          name: 'deprimido',
          value: 'Deprimido',
        },
        {
          name: 'ansioso',
          value: 'Ansioso',
        },
        {
          name: 'euforico',
          value: 'Eufórico',
        },
      ],
    },
    psicomotricidade: {
      name: 'Psicomotricidade',
      values: [
        {
          name: 'normal',
          value: 'Normal',
        },
        {
          name: 'lenta',
          value: 'Lenta',
        },
        {
          name: 'agitada',
          value: 'Agitada',
        },
      ],
    },
    sensopercepcao: {
      name: 'Sensopercepção',
      values: [
        {
          name: 'alucinacao',
          value: 'Alucianação',
        },
        {
          name: 'delirios',
          value: 'Delírios',
        },
        {
          name: 'ilusao',
          value: 'Ilusão',
        },
        {
          name: 'normal',
          value: 'Normal',
        },
      ],
    },
    pensamento: {
      name: 'Pensamento',
      values: [
        {
          name: 'coerente',
          value: 'Coerente',
        },
        {
          name: 'confuso',
          value: 'Confuso',
        },
        {
          name: 'lento',
          value: 'Lento',
        },
        {
          name: 'acelerado',
          value: 'Acelerado',
        },
        {
          name: 'delirante',
          value: 'Delirante',
        },
      ],
    },
  };

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `historicoPsiquico`,
      historicoPsiquico: this.fb.group({
        _id: 'historicoPsiquico',
        higienePessoal: [''],
        vestimenta: [''],
        postura: [''],
        consciencia: [''],
        atencao: [''],
        memoria: [''],
        pensamento: [''],
        linguagem: [''],
        afeto: [''],
        humor: [''],
        psicomotricidade: [''],
        sensopercepcao: [''],
        internacaoPsiquiatrica: [false],
        ideiaSuicida: [false],
        familiar: [false],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService.readById(this.concatenatedPath,'historicoPsiquico').subscribe((res) => {        
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }
}
