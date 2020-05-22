import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasRoutingModule } from './pas-routing.module';
import { UtilsModule } from 'src/app/shared/utils/utils.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { RelatorioComponent } from './relatorio/relatorio.component';

import { WebcamModule } from 'ngx-webcam';
import { IdentificacaoComponent } from './components/identificacao/identificacao.component';
import { PasListComponent } from './components/pas-list/pas-list.component';
import { PasFormComponent } from './components/pas-form/pas-form.component';
import { AcolhidoListComponent } from './components/acolhido-list/acolhido-list.component';
import { AcolhidoFormComponent } from './components/acolhido-form/acolhido-form.component';
import { ResponsavelFormComponent } from './components/responsavel-form/responsavel-form.component';
import { HistoricoPsiquicoFormComponent } from './components/historico-psiquico-form/historico-psiquico-form.component';
import { HistoricoFamiliarSocialFormComponent } from './components/historico-familiar-social-form/historico-familiar-social-form.component';
import { HistoricoForenseFormComponent } from './components/historico-forense-form/historico-forense-form.component';
import { MedicamentoListComponent } from './components/medicamento-list/medicamento-list.component';
import { MedicamentoFormComponent } from './components/medicamento-form/medicamento-form.component';
import { DoencaListComponent } from './components/doenca-list/doenca-list.component';
import { DoencaFormComponent } from './components/doenca-form/doenca-form.component';
import { SaidaListComponent } from './components/saida-list/saida-list.component';
import { SaidaFormComponent } from './components/saida-form/saida-form.component';
import { BiometriaFormComponent } from './components/biometria-form/biometria-form.component';
import { BiometriaListComponent } from './components/biometria-list/biometria-list.component';
import { TratamentoFormComponent } from './components/tratamento-form/tratamento-form.component';
import { HistoricoQuimicoListComponent } from './components/historico-quimico-list/historico-quimico-list.component';
import { HistoricoQuimicoFormComponent } from './components/historico-quimico-form/historico-quimico-form.component';
import { QuadroClinicoFormComponent } from './components/quadro-clinico-form/quadro-clinico-form.component';

@NgModule({
  declarations: [
    IdentificacaoComponent,
    PasListComponent,
    PasFormComponent,
    AcolhidoListComponent,
    AcolhidoFormComponent,
    ResponsavelFormComponent,
    HistoricoPsiquicoFormComponent,
    HistoricoFamiliarSocialFormComponent,
    HistoricoForenseFormComponent,
    MedicamentoListComponent,
    MedicamentoFormComponent,
    DoencaListComponent,
    DoencaFormComponent,
    RelatorioComponent,
    SaidaListComponent,
    SaidaFormComponent,
    BiometriaFormComponent,
    BiometriaListComponent,
    TratamentoFormComponent,
    HistoricoQuimicoListComponent,
    HistoricoQuimicoFormComponent,
    QuadroClinicoFormComponent,
  ],
  imports: [
    CommonModule,
    PasRoutingModule,
    UtilsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,    
    WebcamModule
  ],
  exports: [],
})
export class PasModule {}
