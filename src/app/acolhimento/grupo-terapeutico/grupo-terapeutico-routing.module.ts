import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoTerapeuticoListComponent } from './components/grupo-terapeutico-list/grupo-terapeutico-list.component';

const routes: Routes = [
  {
    path: '',
    component: GrupoTerapeuticoListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoTerapeuticoRoutingModule {}
