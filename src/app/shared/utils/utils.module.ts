import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableBuilderComponent } from './components/dynamic-table-builder/dynamic-table-builder.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { DialogDynamicTableLoaderComponent } from './components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';

@NgModule({
  declarations: [DynamicTableBuilderComponent, DialogDynamicTableLoaderComponent],
  imports: [CommonModule, AngularMaterialModule],  
  exports: [DynamicTableBuilderComponent,DialogDynamicTableLoaderComponent],
})
export class UtilsModule {}
