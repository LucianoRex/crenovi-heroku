import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcolhidoListComponent } from './components/acolhido-list/acolhido-list.component';
import { ProntuarioListComponent } from './components/prontuario-list/prontuario-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProntuarioListComponent,
  },
  {
    path:'acolhido',
    component:AcolhidoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProntuarioRoutingModule {}
