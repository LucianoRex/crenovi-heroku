import {
  Component,
  OnInit,
  Injector,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { DialogDynamicTableLoaderComponent } from 'src/app/shared/utils/components/dialog-dynamic-table-loader/dialog-dynamic-table-loader.component';
import { AcolhidoListComponent } from '../acolhido-list/acolhido-list.component';
import { DatePipe } from '@angular/common';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.css'],
  providers: [DatePipe],
})
export class IdentificacaoComponent extends PasResource implements OnInit {
  convenios: any[] = [
    {
      _id: 'SUS',
      nome: 'SUS',
    },
    {
      _id: 'SENAD',
      nome: 'SENAD',
    },
  ];

  encaminhado: any[] = [
    {
      _id: 1,
      nome: 'Hospital',
    },
    {
      _id: 2,
      nome: 'CAPS',
    },
  ];

  periodos: any[] = [
    {
      _id: '9',
      periodo: '9 meses',
    },
    {
      _id: '12',
      periodo: '12 meses',
    },
  ];
  constructor(protected injector: Injector, private datePipe: DatePipe) {
    super(injector);
  }

  ngOnInit(): void {
    this.selectedRow.subscribe((res) => {
      console.log(res);
    });
    console.log(this.selectedRow);
    this.form = this.fb.group({
      path: 'identificacao',
      identificacao: this.fb.group({
        _id: undefined,
        dataIngresso: ['', Validators.required],
        dataEgresso: [''],
        convenio: [''],
        encaminhado: [''],
        periodo: [''],
        acolhido: this.fb.group({
          _id: [''],
          nome: [''],
        }),
      }),
    });
    this._id !== undefined
      ? this.pasService.readById('identificacao').subscribe((res: any) => {
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }

  getAcolhido() {
    const dialogRef = this.dialog.open(DialogDynamicTableLoaderComponent, {
      maxWidth: '90vw',
      width: '90vw',
      data: { component: AcolhidoListComponent },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
     
      this.form.get('identificacao').get('acolhido').patchValue(res);
    });
  }
}