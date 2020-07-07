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

import { DatePipe } from '@angular/common';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { AcolhidoListComponent } from 'src/app/acolhimento/acolhido/components/acolhido-list/acolhido-list.component';

@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.css'],
  providers: [DatePipe],
})
export class IdentificacaoComponent extends ProntuarioResource
  implements OnInit {
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
      //    console.log(res);
    });
    this.form = this.fb.group({
      path: 'identificacao',
      identificacao: this.fb.group({
        _id: 'identificacao',
        dataIngresso: ['', Validators.required],
        dataEgresso: [''],
        convenio: ['', Validators.required],
        encaminhado: ['', Validators.required],
        periodo: ['', Validators.required],
        acolhido: this.fb.group({
          _id: ['', Validators.required],
          nome: [''],
        }),
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, 'identificacao')
          .subscribe((res: any) => {
            console.log(res);
            this.form.patchValue(res);
          })
      : this.form.get('identificacao').get('dataEgresso').disable();

    this.notify.emit(this.form);

    // super(this.injector)
  }

  getAcolhido() {
    const dialogRef = this.dialog.open(DialogDynamicTableLoaderComponent, {
      maxWidth: '90vw',
      width: '90vw',
      data: { component: AcolhidoListComponent },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.form.get('identificacao').get('acolhido').patchValue(res);
    });
  }

  concluir() {
    this.concluirTratamento();
  }
}
