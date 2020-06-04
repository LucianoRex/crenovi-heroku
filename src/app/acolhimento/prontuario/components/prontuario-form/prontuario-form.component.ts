import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { ProntuarioService } from '../../services/prontuario.service';

@Component({
  selector: 'app-prontuario-form',
  templateUrl: './prontuario-form.component.html',
  styleUrls: ['./prontuario-form.component.css'],
})
export class ProntuarioFormComponent extends ProntuarioResource implements OnInit {
  isLinear = false;
  identificacaoForm: FormGroup;
  responsavelForm: FormGroup;
  historicoPsiquicoForm: FormGroup;
  historicoFamiliarSocialForm: FormGroup;
  historicoForenseForm: FormGroup;
  tratamentoForm: FormGroup;
  quadroClinicoForm: FormGroup;

  //_id: string;
  constructor(protected injector: Injector, protected prontuarioService: ProntuarioService) {
    super(injector);
  }

  ngOnInit() {
    console.log(this._id)
    this.prontuarioService.pas_id = this._id;
    this._id != undefined ? (this.isLinear = false) : (this.isLinear = true);
  }

  identificacao(formGroup: FormGroup): void {
    this.identificacaoForm = formGroup;
  }

  historicoPsiquico(formGroup: FormGroup): void {
    this.historicoPsiquicoForm = formGroup;
  }
  responsavel(formGroup: FormGroup): void {
    this.responsavelForm = formGroup;
  }
  historicoFamiliarSocial(formGroup: FormGroup): void {
    this.historicoFamiliarSocialForm = formGroup;
  }
  historicoForense(formGroup: FormGroup): void {
    this.historicoForenseForm = formGroup;
  }
  tratamento(formGroup: FormGroup): void {
    this.tratamentoForm = formGroup;
  }
  quadroClinico(formGroup: FormGroup): void {
    this.quadroClinicoForm = formGroup;
  }
}
