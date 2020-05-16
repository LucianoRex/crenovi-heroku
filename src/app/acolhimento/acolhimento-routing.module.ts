import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';

const routes: Routes = [
  {
    path:'',
    component:AcolhimentoComponent
  },
  {
    path: 'pas',
    loadChildren: () => import('./pas/pas.module').then((m) => m.PasModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcolhimentoRoutingModule {}
