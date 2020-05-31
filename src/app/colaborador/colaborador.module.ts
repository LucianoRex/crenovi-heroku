import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorListComponent } from './components/colaborador-list/colaborador-list.component';
import { ColaboradorFormComponent } from './components/colaborador-form/colaborador-form.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { UtilsModule } from '../shared/utils/utils.module';


@NgModule({
  declarations: [ColaboradorListComponent, ColaboradorFormComponent],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    UtilsModule,
    NgxMaskModule
  ]
})
export class ColaboradorModule { }
