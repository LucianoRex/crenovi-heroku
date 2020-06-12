import { Component, OnInit, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DynamicListBuilderComponent } from 'src/app/shared/utils/components/dynamic-list-builder/dynamic-list-builder.component';
import { Validators } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';


@Component({
  selector: 'app-doenca-form',
  templateUrl: './doenca-form.component.html',
  styleUrls: ['./doenca-form.component.css'],
})
export class DoencaFormComponent extends ProntuarioResource implements OnInit {
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
      //  _id: undefined,
      path: 'doenca',
      doenca: this.fb.group({
        _id: undefined,
        doenca: this.fb.group({
          _id: [''],
          codigo: [''],
          nome: [''],
        }),
      }),
    });
    this._id !== undefined
      ? this.prontuarioService.readById(this.concatenatedPath, this._id).subscribe((res: any) => {
        //  console.log(res);
          this.form.get('doenca').patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }

  getDoenca() {
    let columns = [
      {
        name: 'codigo',
        label: 'Código',
      },

      {
        name: 'nome',
        label: 'Nome',
      },
    ];
    const dialogRef = this.dialog.open(DynamicListBuilderComponent, {
      maxWidth: '90vw',
      width: '90vw',
      height: '80vh',
      hasBackdrop: false,
      panelClass: 'app-full-bleed-dialog',
      data: {
        api: `${this.apiUrl}/busca/doenca`,
        columns: columns,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.form.get('doenca').get('doenca').patchValue(res);
    });
  }
}
