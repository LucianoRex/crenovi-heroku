import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicListBuilderComponent } from 'src/app/shared/utils/components/dynamic-list-builder/dynamic-list-builder.component';
import { environment } from 'src/environments/environment';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-medicamento-form',
  templateUrl: './medicamento-form.component.html',
  styleUrls: ['./medicamento-form.component.css'],
})
export class MedicamentoFormComponent extends ProntuarioResource implements OnInit {
  //@Output() notify = new EventEmitter();
  apiUrl = environment.apiBaseUrl;
  posologias: any[] = [
    {
      _id: '6/6',
      nome: '6h/6h',
    },
    {
      _id: '12/12',
      nome: '12h/12h',
    },
  ];

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: undefined,
      path: 'medicamento',
      medicamento: this.fb.group({
        _id: undefined,
        posologia: ['', Validators.required],
        medicamento: this.fb.group({
          _id: [''],
          PRODUTO: [''],
          APRESENTACAO: [''],
        }),
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById('medicamento', this._id)
          .subscribe((res: any) => {
            this.form.get('medicamento').patchValue(res);
          })
      : null;
    this.notify.emit(this.form);
  }

  getMedicamento() {
    let columns = [
      {
        name: 'PRODUTO',
        label: 'Produto',
      },

      {
        name: 'APRESENTACAO',
        label: 'Apresentação',
      },
    ];
    const dialogRef = this.dialog.open(DynamicListBuilderComponent, {
      maxWidth: '90vw',
      width: '90vw',
      height: '80vh',
      hasBackdrop:false,
      panelClass: 'app-full-bleed-dialog', 
      data: {
        api: `${this.apiUrl}/busca/medicamento`,
        columns: columns,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.form.get('medicamento').get('medicamento').patchValue(res);
    });
  }
}
