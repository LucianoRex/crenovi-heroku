import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcolhimentoRelatorioComponent } from './relatorio/acolhimento-relatorio.component';
import { NormaFormComponent } from './components/norma-form/norma-form.component';
import { LivroDiarioListComponent } from './components/livro-diario/livro-diario-list/livro-diario-list.component';
import { RotinaDiariaListComponent } from './components/rotina-diaria/rotina-diaria-list/rotina-diaria-list.component';

const routes: Routes = [  
  {
    path: 'prontuario',
    loadChildren: () =>
      import('./prontuario/prontuario.module').then((m) => m.ProntuarioModule),
  },
  {
    path: 'livro-diario',
    component: LivroDiarioListComponent,
  },
  {
    path: 'rotina-diaria',
    component: RotinaDiariaListComponent,
  },
  {
    path: 'norma',
    component: NormaFormComponent,
  },
  {
    path: 'relatorio',
    component: AcolhimentoRelatorioComponent,
  },
  {
    path: 'acolhido',
    loadChildren: () =>
      import('./acolhido/acolhido.module').then((m) => m.AcolhidoModule),
  },
  {
    path: 'parametrizacao',
    loadChildren: () =>
      import('./parametrizacao/parametrizacao.module').then((m) => m.ParametrizacaoModule),
  },
  {
    path: 'grupo-terapeutico',
    loadChildren: () =>
      import('./components/grupo-terapeutico/grupo-terapeutico.module').then(
        (m) => m.GrupoTerapeuticoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcolhimentoRoutingModule {}
