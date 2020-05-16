import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasRoutingModule } from './pas-routing.module';
import { UtilsModule } from 'src/app/shared/utils/utils.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { IdentificacaoComponent } from './identificacao/identificacao.component';
import { PasListComponent } from './pas-list/pas-list.component';
import { PasFormComponent } from './pas-form/pas-form.component';
import { AcolhidoListComponent } from './acolhido-list/acolhido-list.component';
import { AcolhidoFormComponent } from './acolhido-form/acolhido-form.component';
import { ResponsavelFormComponent } from './responsavel-form/responsavel-form.component';

@NgModule({
  declarations: [
    IdentificacaoComponent,
    PasListComponent,
    PasFormComponent,
    AcolhidoListComponent,
    AcolhidoFormComponent,
    ResponsavelFormComponent,
  ],
  imports: [
    CommonModule,
    PasRoutingModule,
    UtilsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [],
})
export class PasModule {}
