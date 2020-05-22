import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PasResource } from '../../classes/pas-resource';
import { PasService } from '../../services/pas.service';

@Component({
  selector: 'app-pas-form',
  templateUrl: './pas-form.component.html',
  styleUrls: ['./pas-form.component.css'],
})
export class PasFormComponent extends PasResource implements OnInit {
  isLinear = false;
  identificacaoForm: FormGroup;
  responsavelForm: FormGroup;
  historicoPsiquicoForm: FormGroup;
  historicoFamiliarSocialForm: FormGroup;
  historicoForenseForm: FormGroup;
  tratamentoForm: FormGroup;
  quadroClinicoForm: FormGroup;

  _id: string;
  constructor(protected injector: Injector, protected pasService: PasService) {
    super(injector);
  }

  ngOnInit() {
    this.pasService.pas_id = this._id;
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
