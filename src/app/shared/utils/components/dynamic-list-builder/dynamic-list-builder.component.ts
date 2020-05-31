import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DynamicListService } from '../../services/dynamic-list.service';

@Component({
  selector: 'app-dynamic-list-builder',
  templateUrl: './dynamic-list-builder.component.html',
  styleUrls: ['./dynamic-list-builder.component.css'],
  providers: [DatePipe],
})
export class DynamicListBuilderComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  apiUrl = environment.apiBaseUrl;
  @Input() columns: any[] = [];
  selectedRow;

  //observer$: Observable<any>;
  private subscriptions: Subscription[] = [];
  form: FormGroup;
  //data: Observable<any>;
  api;
  dataSource: MatTableDataSource<any>;
  displayedColumns;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  title: string;

  constructor(
    public dialogRef: MatDialogRef<DynamicListBuilderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fb: FormBuilder,
    private dynamicListService: DynamicListService
  ) {}

  ngOnDestroy(): void {
    this.dynamicListService.send(this.form.value);
    this.subscriptions.forEach((s) => s.unsubscribe);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      campo: ['', Validators.required],
      comparador: ['', Validators.required],
      valor: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.columns = this.data.columns;
    this.displayedColumns = this.columns.map((column) => column.name);
    this.dynamicListService.get().subscribe((res) => {
      console.log(res);
      this.form.patchValue(res);
      this.buscar();
    });
  }

  getProperty = (obj, path) => path.split('.').reduce((o, p) => o && o[p], obj);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatarData = (obj, path) =>
    this.datePipe.transform(
      path.split('.').reduce((o, p) => o && o[p], obj),
      'dd/MM/yyyy'
    );

  formatarBoolean(obj, path) {
    if (path.split('.').reduce((o, p) => o && o[p], obj) == true) {
      return `👍`;
    } else {
      return '👎';
    }
  }

  buscar() {
    //this.dynamicListService.send(this.form.value);
    this.http.post(this.data.api, this.form.value).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sortingDataAccessor = (obj, property) =>
        this.getProperty(obj, property);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(this.selectedRow);
  }

}
