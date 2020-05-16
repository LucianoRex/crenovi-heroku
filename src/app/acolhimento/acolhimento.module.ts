import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcolhimentoRoutingModule } from './acolhimento-routing.module';
import { AcolhimentoComponent } from './acolhimento/acolhimento.component';
import { DynamicTableBuilderComponent } from '../shared/utils/components/dynamic-table-builder/dynamic-table-builder.component';
import { UtilsModule } from '../shared/utils/utils.module';


@NgModule({
  declarations: [AcolhimentoComponent],
  imports: [
    CommonModule,
    AcolhimentoRoutingModule, 
  //  UtilsModule
  ]
})
export class AcolhimentoModule { }
