import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcolhimentoRoutingModule } from './acolhimento-routing.module';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { LivroDiarioListComponent } from './livro-diario/livro-diario-list/livro-diario-list.component';
import { LivroDiarioFormComponent } from './livro-diario/livro-diario-form/livro-diario-form.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UtilsModule } from '../shared/utils/utils.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NormaFormComponent } from './norma-form/norma-form.component';
import { RotinaDiariaListComponent } from './rotina-diaria/rotina-diaria-list/rotina-diaria-list.component';
import { RotinaDiariaFormComponent } from './rotina-diaria/rotina-diaria-form/rotina-diaria-form.component';
import { MaskDirective, NgxMaskModule, IConfig } from 'ngx-mask';

@NgModule({
  declarations: [
    AcolhimentoComponent,
    LivroDiarioListComponent,
    LivroDiarioFormComponent,
    NormaFormComponent,
    RotinaDiariaListComponent,
    RotinaDiariaFormComponent,
  ],
  imports: [
    CommonModule,
    AcolhimentoRoutingModule,
    AngularMaterialModule,
    UtilsModule,
    ReactiveFormsModule,
    NgxMaskModule,
  ],
})
export class AcolhimentoModule {}
