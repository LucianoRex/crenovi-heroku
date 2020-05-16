import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  Output,
  EventEmitter,
  ComponentRef,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicTableBuilderComponent } from '../components/dynamic-table-builder/dynamic-table-builder.component';
import { DialogDynamicTableLoaderComponent } from '../components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';
import { Observable } from 'rxjs';

export  class DynamicFormTableResource {
  protected resolver: ComponentFactoryResolver;
  protected viewContainerRef: ViewContainerRef;
  protected dialog: MatDialog;
  @Output() selectedRow = new EventEmitter<any>();
  public fb: FormBuilder;
  public form: FormGroup;
  //@Output() selected = new EventEmitter<any>();
  constructor(protected injector: Injector) {
    this.resolver = injector.get(ComponentFactoryResolver);
    this.viewContainerRef = injector.get(ViewContainerRef);
    this.dialog = injector.get(MatDialog);
    this.fb = injector.get(FormBuilder);
  }

  montaTabela(columns, service, component) {
    let dynamicTableBuilder = this.resolver.resolveComponentFactory(
      DynamicTableBuilderComponent
    );
    let componentRef = this.viewContainerRef.createComponent(
      dynamicTableBuilder
    );

    componentRef.instance.columns = columns;
    componentRef.instance.data = service;

    componentRef.instance.selectedRow.subscribe((res) => {
      this.selectedRow.emit(res);
      console.log(this.selectedRow);
    });
    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.create.subscribe((res) => {
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: { component: component, _id: undefined },
      });
    });

    componentRef.instance.update.subscribe((res) => {
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: { component: component, _id: res._id },
      });
    });
  }
}
