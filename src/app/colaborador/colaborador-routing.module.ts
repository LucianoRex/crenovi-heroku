import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradorListComponent } from './components/colaborador-list/colaborador-list.component';

const routes: Routes = [
  {
    path: 'colaborador',
    component: ColaboradorListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaboradorRoutingModule {}
