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
import * as io from 'socket.io-client';

@Component({
  selector: 'app-dynamic-table-builder',
  templateUrl: './dynamic-table-builder.component.html',
  styleUrls: ['./dynamic-table-builder.component.css'],
  providers: [DatePipe],
})
export class DynamicTableBuilderComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
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
  socket = io('http://localhost:4000');
  title: string;

  constructor(private datePipe: DatePipe) {}
  

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe);
  }

  ngOnInit(): void {
    this.getData();
    this.socket.on(
      'update-data',
      function (data: any) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getData();
      }.bind(this)
    );

    this.columns.push({ name: 'acoes', label: 'Ações' });
    this.displayedColumns = this.columns.map((column) => column.name);
  }

  getData() {
    this.data.subscribe((res) => {     
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sortingDataAccessor = (obj, property) =>
        this.getProperty(obj, property);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  createEvent(e:Event){
    e.stopPropagation();
    e.preventDefault()
    this.create.emit()
  }
}
