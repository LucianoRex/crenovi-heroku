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
import { environment } from 'src/environments/environment';
import { ProntuarioSocketService } from 'src/app/acolhimento/prontuario/services/prontuario-socket.service';
import { take } from 'rxjs/operators';

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
  dados;
  observer$: Observable<any>;
  private subscriptions: Subscription[] = [];
  data: Observable<any>;
  dataSource: MatTableDataSource<any>;
  socketioPath;
  displayedColumns;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  //socket = io(environment.SOCKET_ENDPOINT);
  title: string;

  constructor(
    private datePipe: DatePipe
  ) // private socketService: ProntuarioSocketService
  {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe);
 //   this.socket.disconnect();
  }

  ngOnInit(): void {
    // console.log(this.socketioPath);
   /* this.socket.on(
      this.socketioPath,
      function (data: any) {
        this.getData();
      }.bind(this)
    );
*/
    this.columns.push({ name: 'acoes', label: 'Ações' });
    this.displayedColumns = this.columns.map((column) => column.name);
  }
  load() {
    this.getData();
  }
  getData() {
    this.data.subscribe((res) => {
      this.dados = res;
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

  formatPhoneNumber = (obj, str) => {
    let cleaned = (
      '' + str.split('.').reduce((o, p) => o && o[p], obj)
    ).replace(/\D/g, '');
    console.log(cleaned);
    let match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);

    if (match) {
      return '(' + match[1] + ') ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return null;
  };

  formataHora(obj, path) {
    let hora = new String(path.split('.').reduce((o, p) => o && o[p], obj));
    return hora.substring(0, 2) + ':' + hora.substring(2);
  }

  createEvent(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.create.emit();
  }
}
