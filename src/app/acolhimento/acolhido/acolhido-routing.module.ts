import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcolhidoListComponent } from './components/acolhido-list/acolhido-list.component';


const routes: Routes = [
  {
    path:'',
    component:AcolhidoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcolhidoRoutingModule { }
