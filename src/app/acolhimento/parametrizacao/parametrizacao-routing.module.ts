import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoConsultaListComponent } from './components/tipo-consulta/tipo-consulta-list/tipo-consulta-list.component';
import { TipoConvenioListComponent } from './components/tipo-convenio/tipo-convenio-list/tipo-convenio-list.component';
import { ItemAcolhidoListComponent } from './components/item-acolhido/item-acolhido-list/item-acolhido-list.component';
import { TipoProcedimentoPsicologicoListComponent } from './components/tipo-procedimento-psicologico/tipo-procedimento-psicologico-list/tipo-procedimento-psicologico-list.component';
import { TipoSpaListComponent } from './components/tipo-spa/tipo-spa-list/tipo-spa-list.component';

const routes: Routes = [
  {
    path: 'tipoconsulta',
    component: TipoConsultaListComponent,
  },
  {
    path: 'tipoconvenio',
    component: TipoConvenioListComponent,
  },
  {
    path: 'itemacolhido',
    component: ItemAcolhidoListComponent,
  },
  {
    path: 'tipoprocedimentopsicologico',
    component: TipoProcedimentoPsicologicoListComponent,
  },
  {
    path: 'tipospa',
    component: TipoSpaListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrizacaoRoutingModule {}
