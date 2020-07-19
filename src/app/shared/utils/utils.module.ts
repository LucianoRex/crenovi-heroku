import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableBuilderComponent } from './components/dynamic-table-builder/dynamic-table-builder.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { DialogDynamicTableLoaderComponent } from './components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';
import { DynamicListBuilderComponent } from './components/dynamic-list-builder/dynamic-list-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SaveButtonDirective } from './directives/save-button.directive';
import { ButtonSaveComponent } from './components/button-save/button-save.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
//export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    DynamicTableBuilderComponent,
    DialogDynamicTableLoaderComponent,
    DynamicListBuilderComponent,
    SaveButtonDirective,
    ButtonSaveComponent,
    SpinnerComponent,    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    //NgxMaskModule.forRoot(options),
  ],
  exports: [DynamicTableBuilderComponent, DialogDynamicTableLoaderComponent,SaveButtonDirective,ButtonSaveComponent],
})
export class UtilsModule {}
