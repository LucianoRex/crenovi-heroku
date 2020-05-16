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
import { PasResource } from '../classes/pas-resource';
import { AcolhidoListComponent } from '../acolhido-list/acolhido-list.component';

@Component({
  selector: 'app-identificacao',
  templateUrl: './identificacao.component.html',
  styleUrls: ['./identificacao.component.css'],
})
export class IdentificacaoComponent extends PasResource implements OnInit {
  @Output() notify = new EventEmitter();
  convenios: any[] = [
    {
      _id: 1,
      nome: 'SUS',
    },
    {
      _id: 2,
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
      _id: 1,
      periodo: '9 meses',
    },
    {
      _id: 2,
      periodo: '12 meses',
    },
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      // _id:[''],
      identificacao: this.fb.group({
        //    _id: [''],
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
      ? this.pasService.readById(this._id).subscribe((res) => {
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
