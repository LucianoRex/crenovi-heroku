import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcolhimentoRoutingModule } from './acolhimento-routing.module';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { LivroDiarioListComponent } from './livro-diario/livro-diario-list/livro-diario-list.component';
import { LivroDiarioFormComponent } from './livro-diario/livro-diario-form/livro-diario-form.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UtilsModule } from '../shared/utils/utils.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AcolhimentoComponent,
    LivroDiarioListComponent,
    LivroDiarioFormComponent,
  ],
  imports: [CommonModule, AcolhimentoRoutingModule,AngularMaterialModule, UtilsModule,ReactiveFormsModule],
})
export class AcolhimentoModule {}
