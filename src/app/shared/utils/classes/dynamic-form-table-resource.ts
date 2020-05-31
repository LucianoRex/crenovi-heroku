import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  Output,
  EventEmitter,
  ComponentRef,
  TemplateRef,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicTableBuilderComponent } from '../components/dynamic-table-builder/dynamic-table-builder.component';
import { DialogDynamicTableLoaderComponent } from '../components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';
import { DynamicListBuilderComponent } from '../components/dynamic-list-builder/dynamic-list-builder.component';

export class DynamicFormTableResource {
  protected resolver: ComponentFactoryResolver;
  protected viewContainerRef: ViewContainerRef;
  protected dialog: MatDialog;
 
  @Output() selectedRow = new EventEmitter<any>();
  @Output() removeRow = new EventEmitter<any>();
  @Output() notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  public fb: FormBuilder;
  public form: FormGroup;
  constructor(protected injector: Injector) {
    this.resolver = injector.get(ComponentFactoryResolver);
    this.viewContainerRef = injector.get(ViewContainerRef);
    this.dialog = injector.get(MatDialog);
    this.fb = injector.get(FormBuilder);
  }
  
  remove(): void {}

  montaTabela(
    columns,
    service,
    component?,
    _id = undefined,
    socketiodata?: string
  ) {
    let dynamicTableBuilder = this.resolver.resolveComponentFactory(
      DynamicTableBuilderComponent
    );
    let componentRef = this.viewContainerRef.createComponent(
      dynamicTableBuilder
    );
    componentRef.instance.columns = columns;
    componentRef.instance.data = service;
    componentRef.instance.socketiodata = socketiodata;
    componentRef.instance.selectedRow.subscribe((res) => {
      this.selectedRow.emit(res);
    });

    componentRef.instance.create.subscribe((res) => {
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: { component: component, _id: undefined },
        maxWidth: '90vw',
        width: '90vw',
        height: '90vh',
        hasBackdrop: false,
        panelClass: 'app-full-bleed-dialog',
      });
    });

    componentRef.instance.update.subscribe((res) => {
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: { component: component, _id: res._id },
        maxWidth: '90vw',
        width: '90vw',
        height: '90vh',
        hasBackdrop: false,
        panelClass: 'app-full-bleed-dialog',
      });
    });

    componentRef.instance.delete.subscribe((res) => {
      this.remove();
    });
  }
}
