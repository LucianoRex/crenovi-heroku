import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasListComponent } from './components/pas-list/pas-list.component';
import { AcolhidoListComponent } from './components/acolhido-list/acolhido-list.component';


const routes: Routes = [
  {
    path: '',
    component: PasListComponent,
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
export class PasRoutingModule {}
