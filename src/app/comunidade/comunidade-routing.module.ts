import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComunidadeFormComponent } from './components/comunidade-form/comunidade-form.component';

const routes: Routes = [
  {
    path: 'comunidade',
    component: ComunidadeFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunidadeRoutingModule {}
