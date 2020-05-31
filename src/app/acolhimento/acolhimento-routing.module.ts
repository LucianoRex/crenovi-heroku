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
    path: 'pas',
    loadChildren: () => import('./pas/pas.module').then((m) => m.PasModule),
  },
  {
    path:'livro-diario',
    component:LivroDiarioListComponent
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
