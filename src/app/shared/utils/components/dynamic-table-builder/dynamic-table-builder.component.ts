import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { DialogLoaderService } from '../../services/dialog-loader.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-table-builder',
  templateUrl: './dynamic-table-builder.component.html',
  styleUrls: ['./dynamic-table-builder.component.css'],
  providers: [DatePipe],
})
export class DynamicTableBuilderComponent implements OnInit, OnChanges {
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
  enableRemove: boolean = false;
  //socket = io(environment.SOCKET_ENDPOINT);
  title: string;

  constructor(
    private datePipe: DatePipe, // private socketService: ProntuarioSocketService
    private spinner: NgxSpinnerService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.update) {
      this.spinner.show();
    }
  }

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
    this.spinner.show();
    this.data.subscribe((res) => {
      this.spinner.hide();
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

  formatNumberPattern(obj, path) {
    let format = new String(
      path.name.split('.').reduce((o, p) => o && o[p], obj)
    );
    let formatted = '';
    format.split('').forEach((e, i) => {
      if (!/[0-9]/.test(path.pattern.charAt(i))) {
        formatted += path.pattern[i] + e;
      } else {
        formatted += e;
      }
    });
    return formatted; //hora.substring(0, 2) + ':' + hora.substring(2);
  }

  createEvent(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.create.emit();
  }
  loadDialog(show: boolean) {
    show ? this.spinner.show() : this.spinner.hide();
  }
}
