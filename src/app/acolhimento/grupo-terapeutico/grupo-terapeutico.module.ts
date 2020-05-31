import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoTerapeuticoRoutingModule } from './grupo-terapeutico-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { GrupoTerapeuticoFormComponent } from './components/grupo-terapeutico-form/grupo-terapeutico-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GrupoTerapeuticoFormComponent],
  imports: [
    CommonModule,
    GrupoTerapeuticoRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class GrupoTerapeuticoModule { }
