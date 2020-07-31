import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { ProntuarioFormComponent } from '../prontuario-form/prontuario-form.component';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';
import { IDynamicFormTable } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { Store, select } from '@ngrx/store';
import * as prontuarioActions from '../../state/prontuario.actions';
import { Observable } from 'rxjs';
import { Prontuario } from '../../models/prontuario';
import * as fromProntuario from '../../state/prontuario.reducer';

@Component({
  selector: 'app-prontuario-list',
  templateUrl: './prontuario-list.component.html',
  styleUrls: ['./prontuario-list.component.css'],
})
export class ProntuarioListComponent extends ProntuarioResource
  implements OnInit {
  lista;
  prontuarios$: Observable<Prontuario[]>;
  error$: Observable<String>;
  constructor(
    protected injector: Injector,
    private store: Store<fromProntuario.AppState>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.store.dispatch(new prontuarioActions.LoadProntuarios());
    this.prontuarios$ = this.store.pipe(select(fromProntuario.getProntuarios));
    this.error$ = this.store.pipe(select(fromProntuario.getError));
    this.concatenatedPath = 'acolhimento';
    let columns: IDynamicTableBuilder[] = [
      {
        name: 'ativo',
        label: 'Em acolhimento',
        type: FieldType.boolean,
      },
      {
        name: 'identificacao.acolhido.nome',
        label: 'Acolhido',
      },
      {
        name: 'identificacao.dataIngresso',
        label: 'Data Ingresso',
        type: FieldType.date,
      },
      {
        name: 'identificacao.convenio.nome',
        label: 'Convênio',
      },
      {
        name: 'identificacao.periodo',
        label: 'Período',
        complemento: ' Meses',
      },
    ];

    let data: IDynamicFormTable = {
      columns: columns,
      service: this.prontuarioService.getProntuarios(),
      component: ProntuarioFormComponent,
      _id: undefined,
      caminho: 'prontuario',
      title: 'Prontuário',
      dados: this.prontuarios$,
    };

    this.montaTabela(data);
  }

  update(prontuario: Prontuario) {   
    //debugger 
    console.log(prontuario)
    this.store.dispatch(new prontuarioActions.LoadProntuario(prontuario.id));
  }
  remove(doc) {
    //this.store.dispatch(new prontuarioActions.(doc));
  }
}
