import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunidadeRoutingModule } from './comunidade-routing.module';
import { ComunidadeFormComponent } from './components/comunidade-form/comunidade-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AtaListComponent } from './components/ata-list/ata-list.component';

@NgModule({
  declarations: [ComunidadeFormComponent, AtaListComponent],
  imports: [
    CommonModule,
    ComunidadeRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
})
export class ComunidadeModule {}
