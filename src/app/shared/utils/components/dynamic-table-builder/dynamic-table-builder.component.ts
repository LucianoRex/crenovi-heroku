import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-table-builder',
  templateUrl: './dynamic-table-builder.component.html',
  styleUrls: ['./dynamic-table-builder.component.css'],
  providers: [DatePipe],
})
export class DynamicTableBuilderComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() columns: any[] = [];
  @Output() update = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() selectedRow = new EventEmitter<any>();

  observer$: Observable<any>;
  private subscriptions: Subscription[] = [];
  data: Observable<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  title: string;

  constructor(
    private _httpClient: HttpClient,
    private datePipe: DatePipe // private dynamicFormTableControllerService: DynamicFormTableControllerService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }

  ngOnInit(): void {
    this.data.subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      console.log(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
        return this.getPropertyByPath(data, sortHeaderId);
      };
    });
    // this.columns.push({ name: 'c', label: 'A' })
    //  this.columns.push({ name: 'a', label: 'A' })
    this.columns.push({ name: 'acoes', label: 'Ações' });
    this.displayedColumns = this.columns.map((column) => column.name);
    //  this.dataSource = new MatTableDataSource();
    //    this.dataSource.sort = this.sort;
    //    this.dataSource.paginator = this.paginator;
    //   this.isLoadingResults = false;
    //   this.isRateLimitReached = false;
    console.log(this.displayedColumns)
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  ) 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatarData(data) {
    return this.datePipe.transform(data, 'dd/MM/yyyy');
  }

  retornaCampo(data:any) {
  //console.log(data.split('.'))
    return data;
  
  }

  refresh() {
    this.isLoadingResults = true;
    this.isRateLimitReached = true;

    this._httpClient
      .get(
        /*this.fields.metadata.path, { params: { ...this.fields.metadata } }*/ 'http://localhost:3000/acolhimento'
      )
      .subscribe((res: any) => {
        //this.columns.push({ name: 'acoes', label: 'Ações' })
        //this.displayedColumns = this.columns.map(column => column.name);
        this.dataSource = new MatTableDataSource(res);
        //  this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
      });
  }
}
