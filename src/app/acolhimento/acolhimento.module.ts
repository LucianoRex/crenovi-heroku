import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcolhimentoRoutingModule } from './acolhimento-routing.module';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { UtilsModule } from '../shared/utils/utils.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MaskDirective, NgxMaskModule, IConfig } from 'ngx-mask';
import { AcolhimentoRelatorioComponent } from './relatorio/acolhimento-relatorio.component';
import { NormaFormComponent } from './components/norma-form/norma-form.component';
import { LivroDiarioListComponent } from './components/livro-diario/livro-diario-list/livro-diario-list.component';
import { LivroDiarioFormComponent } from './components/livro-diario/livro-diario-form/livro-diario-form.component';
import { RotinaDiariaListComponent } from './components/rotina-diaria/rotina-diaria-list/rotina-diaria-list.component';
import { RotinaDiariaFormComponent } from './components/rotina-diaria/rotina-diaria-form/rotina-diaria-form.component';


@NgModule({
  declarations: [    
    LivroDiarioListComponent,
    LivroDiarioFormComponent,
    NormaFormComponent,
    RotinaDiariaListComponent,
    RotinaDiariaFormComponent,
    AcolhimentoRelatorioComponent,
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
