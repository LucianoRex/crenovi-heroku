import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableBuilderComponent } from './components/dynamic-table-builder/dynamic-table-builder.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { DialogDynamicTableLoaderComponent } from './components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';
import { DynamicListBuilderComponent } from './components/dynamic-list-builder/dynamic-list-builder.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DynamicTableBuilderComponent,
    DialogDynamicTableLoaderComponent,
    DynamicListBuilderComponent,
  ],
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  exports: [DynamicTableBuilderComponent, DialogDynamicTableLoaderComponent],
})
export class UtilsModule {}
