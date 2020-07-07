import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicListBuilderComponent } from 'src/app/shared/utils/components/dynamic-list-builder/dynamic-list-builder.component';
import { environment } from 'src/environments/environment';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  switchMap,
  finalize,
  startWith,
} from 'rxjs/operators';

@Component({
  selector: 'app-medicamento-form',
  templateUrl: './medicamento-form.component.html',
  styleUrls: ['./medicamento-form.component.css'],
})
export class MedicamentoFormComponent extends ProntuarioResource
  implements OnInit {
  //@Output() notify = new EventEmitter();
  isLoading = false;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions;
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
      array: true,
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
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('medicamento').patchValue(res);
          })
      : null;
    this.notify.emit(this.form);

    this.form
      .get('medicamento')
      .get('medicamento')
      .get('PRODUTO')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((query: string) => query?.length > 1),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.prontuarioService
            .buscaMedicamento({ medicamento: value }, 1)
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((users) => (this.filteredOptions = users));
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
      hasBackdrop: false,
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

  updateForm(ev: any, option: any) {
    console.log(option);
    this.form.get('medicamento').get('medicamento').patchValue(option);
    /*if (ev.isUserInput) {
      if (componentid === 'country_id') {
        this.countryid = idd;
        this.registerUserForm['controls']['country_id'].setValue(ev.source.value);
      }  else {
        console.log('ooops');
      }
    }*/
  }
}
