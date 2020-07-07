import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcolhidoRoutingModule } from './acolhido-routing.module';
import { AcolhidoListComponent } from './components/acolhido-list/acolhido-list.component';
import { AcolhidoFormComponent } from './components/acolhido-form/acolhido-form.component';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { NgxMaskModule } from 'ngx-mask';
import { UtilsModule } from 'src/app/shared/utils/utils.module';

@NgModule({
  declarations: [AcolhidoListComponent, AcolhidoFormComponent],
  imports: [
    CommonModule,
    AcolhidoRoutingModule,
    NgxMaskModule,
    WebcamModule,
    ReactiveFormsModule,
    AngularMaterialModule,   
  ],
})
export class AcolhidoModule {}
