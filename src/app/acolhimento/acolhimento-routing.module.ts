import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { LivroDiarioListComponent } from './livro-diario/livro-diario-list/livro-diario-list.component';

const routes: Routes = [
  {
    path: '',
    component: AcolhimentoComponent,
  },
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
    path: 'grupo-terapeutico',
    loadChildren: () =>
      import('./grupo-terapeutico/grupo-terapeutico.module').then(
        (m) => m.GrupoTerapeuticoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcolhimentoRoutingModule {}
