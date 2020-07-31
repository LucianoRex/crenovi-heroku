import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrizacaoRoutingModule } from './parametrizacao-routing.module';
import { ItemAcolhidoListComponent } from './components/item-acolhido/item-acolhido-list/item-acolhido-list.component';
import { ItemAcolhidoFormComponent } from './components/item-acolhido/item-acolhido-form/item-acolhido-form.component';
import { TipoConsultaListComponent } from './components/tipo-consulta/tipo-consulta-list/tipo-consulta-list.component';
import { TipoConsultaFormComponent } from './components/tipo-consulta/tipo-consulta-form/tipo-consulta-form.component';
import { TipoProcedimentoPsicologicoFormComponent } from './components/tipo-procedimento-psicologico/tipo-procedimento-psicologico-form/tipo-procedimento-psicologico-form.component';
import { TipoProcedimentoPsicologicoListComponent } from './components/tipo-procedimento-psicologico/tipo-procedimento-psicologico-list/tipo-procedimento-psicologico-list.component';
import { TipoSpaListComponent } from './components/tipo-spa/tipo-spa-list/tipo-spa-list.component';
import { TipoSpaFormComponent } from './components/tipo-spa/tipo-spa-form/tipo-spa-form.component';
import { TipoConvenioListComponent } from './components/tipo-convenio/tipo-convenio-list/tipo-convenio-list.component';
import { TipoConvenioFormComponent } from './components/tipo-convenio/tipo-convenio-form/tipo-convenio-form.component';


@NgModule({
  declarations: [ItemAcolhidoListComponent, ItemAcolhidoFormComponent, TipoConsultaListComponent, TipoConsultaFormComponent, TipoProcedimentoPsicologicoFormComponent, TipoProcedimentoPsicologicoListComponent, TipoSpaListComponent, TipoSpaFormComponent, TipoConvenioListComponent, TipoConvenioFormComponent],
  imports: [
    CommonModule,
    ParametrizacaoRoutingModule
  ]
})
export class ParametrizacaoModule { }
