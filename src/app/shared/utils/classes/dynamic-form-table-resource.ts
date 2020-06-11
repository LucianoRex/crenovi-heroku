import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicTableBuilderComponent } from '../components/dynamic-table-builder/dynamic-table-builder.component';
import { DialogDynamicTableLoaderComponent } from '../components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';

export class DynamicFormTableResource {
  protected resolver: ComponentFactoryResolver;
  protected viewContainerRef: ViewContainerRef;
  protected dialog: MatDialog;
  // saved: boolean = false;
  //componentOpened;
  //isDirty: boolean = false;
  //mudouForm: boolean = false;
  //socketioPath;
  @Output() selectedRow = new EventEmitter<any>();
  @Output() formChange = new EventEmitter<any>();
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

  montaTabela({
    columns,
    service,
    component,
    socketioPath,
    caminho,
  }: {
    columns: Array<any>;
    service: any;
    component?;
    _id?: any;
    socketioPath: string;
    caminho?: string;
  }) {    
    let dynamicTableBuilder = this.resolver.resolveComponentFactory(
      DynamicTableBuilderComponent
    );
    let componentRef = this.viewContainerRef.createComponent(
      dynamicTableBuilder
    );
    componentRef.instance.columns = columns;
    componentRef.instance.data = service;
    componentRef.instance.socketioPath = socketioPath;
    componentRef.instance.selectedRow.subscribe((res) => {
      this.selectedRow.emit(res);
    });

    componentRef.instance.create.subscribe(() => {
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: { component: component, _id: undefined ,caminho: caminho},
        maxWidth: '90vw',
        width: '90vw',
        height: '90vh',
        hasBackdrop: false,
        panelClass: 'app-full-bleed-dialog',
      });
    });

    componentRef.instance.update.subscribe((res) => {
      this.formChange.emit(false);      
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: { component: component, _id: res._id, caminho: caminho },
        maxWidth: '90vw',
        width: '90vw',
        height: '90vh',
        hasBackdrop: false,
        panelClass: 'app-full-bleed-dialog',
      });
    });

    componentRef.instance.delete.subscribe(() => {
      this.remove();
    });
  }
}
