import {
  Component,
  OnInit,
  Inject,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dynamic-table-loader',
  templateUrl: './dialog-dynamic-table-loader.component.html',
  styleUrls: ['./dialog-dynamic-table-loader.component.css'],
})
export class DialogDynamicTableLoaderComponent implements OnInit, OnDestroy {
  isDirty: boolean = false;

  //socket = io(environment.SOCKET_ENDPOINT);
  constructor(
    public dialogRef: MatDialogRef<DialogDynamicTableLoaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected viewContainerRef: ViewContainerRef,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    //this.socket.emit('disconnect', {});
  }

  ngOnInit(): void {
    let component = this.componentFactoryResolver.resolveComponentFactory(
      this.data.component
    );
    let componentRef = this.viewContainerRef.createComponent(component);
    //componentRef.changeDetectorRef.detectChanges();
    componentRef.instance['_id'] = this.data._id;
    componentRef.instance['concatenatedPath'] = this.data.caminho;
    componentRef.instance['caminho'] = this.data.caminho;

    if (componentRef.instance['selectedRow']) {
      componentRef.instance['selectedRow'].subscribe((res) => {
        this.data = res;
      });
    }

    if (componentRef.instance['saved']) {
      componentRef.instance['saved'].subscribe((res) => {
        if (res == true) {
          this.dialogRef.close();
        }
      });
    }    

    if (componentRef.instance['formChange']) {
      componentRef.instance['formChange'].subscribe((res) => {
        this.isDirty = res;
      });
    }

    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.data);
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
}
