import {
  Component,
  OnInit,
  Inject,
  ComponentFactoryResolver,
  ViewContainerRef,
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
export class DialogDynamicTableLoaderComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDynamicTableLoaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    let component = this.componentFactoryResolver.resolveComponentFactory(
      this.data.component
    );
    let componentRef = this.viewContainerRef.createComponent(component);    
    componentRef.instance['_id'] = this.data._id;
    if (componentRef.instance['selectedRow']) {
      componentRef.instance['selectedRow'].subscribe((res) => {
        this.data = res;
      });
    }

    this.dialogRef.backdropClick().subscribe(() => {
      console.log(this.data);
      this.dialogRef.close(this.data);
    });
    componentRef.changeDetectorRef.detectChanges();
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
}
