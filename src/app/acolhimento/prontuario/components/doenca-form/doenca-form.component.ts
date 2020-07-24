import { Component, OnInit, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DynamicListBuilderComponent } from 'src/app/shared/utils/components/dynamic-list-builder/dynamic-list-builder.component';
import { Validators } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  switchMap,
  finalize,
} from 'rxjs/operators';

@Component({
  selector: 'app-doenca-form',
  templateUrl: './doenca-form.component.html',
  styleUrls: ['./doenca-form.component.css'],
})
export class DoencaFormComponent extends ProntuarioResource implements OnInit {
  //@Output() notify = new EventEmitter();
  filteredOptions;
  isLoading = false;
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
      path: 'doenca',
      array: true,
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
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            //  console.log(res);
            this.form.get('doenca').patchValue(res);
          })
      : null;
    this.notify.emit(this.form);
    this.form
      .get('doenca')
      .get('doenca')
      .get('nome')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((query: string) => query?.length > 3),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.prontuarioService
            .buscaDoenca({ doenca: value }, 1)
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((users) => (this.filteredOptions = users));

      this.form
      .get('doenca')
      .get('doenca')
      .get('codigo')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((query: string) => query?.length > 1),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.prontuarioService
            .buscaDoenca({ doenca: value }, 1)
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((users) => (this.filteredOptions = users));
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
      this.form.get('doenca').get('doenca').patchValue(res);
    });
  }

  updateForm(ev: any, option: any) {
    this.form.get('doenca').get('doenca').patchValue(option);
  }
}
