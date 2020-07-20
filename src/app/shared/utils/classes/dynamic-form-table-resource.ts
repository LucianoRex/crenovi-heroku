import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicTableBuilderComponent } from '../components/dynamic-table-builder/dynamic-table-builder.component';
import { DialogDynamicTableLoaderComponent } from '../components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';
import { ProntuarioSocketService } from 'src/app/acolhimento/prontuario/services/prontuario-socket.service';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { take } from 'rxjs/operators';
import { DynamicListService } from '../services/dynamic-list.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface IDynamicFormTable {
  columns: Array<any>;
  service: any;
  component?;
  _id?: any;
  caminho?: string;
  title?: string;
  enableRemove?: boolean;
}
export abstract class DynamicFormTableResource {
  protected resolver: ComponentFactoryResolver;
  protected viewContainerRef: ViewContainerRef;
  protected dynamicListService: DynamicListService;
  protected dialog: MatDialog;
  protected toastr: ToastrService;
  //socket = io(environment.SOCKET_ENDPOINT);
  // saved: boolean = false;
  //componentOpened;
  //isDirty: boolean = false;
  //mudouForm: boolean = false;
  //socketioPath;
  @Output() selectedRow = new EventEmitter<any>();
  @Output() createdDoc = new EventEmitter<any>();
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
    this.dynamicListService = injector.get(DynamicListService);
    this.toastr = injector.get(ToastrService);
  }

  remove(data): void {}

  montaTabela(data: IDynamicFormTable) {
    let dynamicTableBuilder = this.resolver.resolveComponentFactory(
      DynamicTableBuilderComponent
    );
    let componentRef = this.viewContainerRef.createComponent(
      dynamicTableBuilder
    );
    componentRef.instance.columns = data.columns;
    componentRef.instance.data = data.service;
    componentRef.instance.enableRemove = data.enableRemove;
    //  componentRef.instance.socketioPath = socketioPath;
    componentRef.instance.selectedRow.subscribe((res) => {
      this.selectedRow.emit(res);
    });

    componentRef.instance.create.subscribe(() => {
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: {
          component: data.component,
          _id: undefined,
          caminho: data.caminho,
          title: data.title,
        },
        maxWidth: '90vw',
        width: '90vw',
        height: '90vh',
        hasBackdrop: false,
        panelClass: 'app-full-bleed-dialog',
      });
    });

    componentRef.instance.update.subscribe(async (res) => {
      this.formChange.emit(false);
      this.dialog.open(DialogDynamicTableLoaderComponent, {
        data: {
          component: data.component,
          _id: res._id,
          caminho: data.caminho,
          title: data.title,
        },
        maxWidth: '90vw',
        width: '90vw',
        height: '90vh',
        hasBackdrop: false,
        panelClass: 'app-full-bleed-dialog',
      });
    });

    componentRef.instance.delete.subscribe((res) => {
      console.log(data.caminho + '/' + res);
      let confirma = confirm('Deseja Realmente Excluir?');
      confirma ? this.remove(data.caminho + '/' + res) : null;
    });
  }
}
