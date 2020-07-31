import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorListComponent } from './components/colaborador-list/colaborador-list.component';
import { ColaboradorFormComponent } from './components/colaborador-form/colaborador-form.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { UtilsModule } from '../shared/utils/utils.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ColaboradorReducer } from './state/colaborador.reducer';
import { ColaboradorEffect } from './state/colaborador.effects';
import { ColaboradorFormUpdateComponent } from './components/colaborador-form-update/colaborador-form-update.component';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';

@NgModule({
  declarations: [
    ColaboradorListComponent,
    ColaboradorFormComponent,
    ColaboradorFormUpdateComponent,
    ColaboradorComponent,
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    UtilsModule,
    NgxMaskModule,
    StoreModule.forFeature('colaboradores', ColaboradorReducer),
    EffectsModule.forFeature([ColaboradorEffect]),
  ],
})
export class ColaboradorModule {}
