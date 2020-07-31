import { Component, OnInit, Injector } from '@angular/core';
import { ColaboradorResource } from '../../classes/colaborador-resource';
import { ColaboradorFormComponent } from '../colaborador-form/colaborador-form.component';
import {
  IDynamicTableBuilder,
  FieldType,
} from 'src/app/shared/utils/interfaces/dynamic-table-builder';
import { Observable } from 'rxjs';
import { Colaborador } from '../../models/colaborador';
import { Store, select } from '@ngrx/store';
import * as fromColaborador from '../../state/colaborador.reducer';
import * as colaboradorActions from '../../state/colaborador.actions';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css'],
})
export class ColaboradorListComponent extends ColaboradorResource
  implements OnInit {
  colaboradores$: Observable<Colaborador[]>;
  error$: Observable<String>;
  constructor(
    injector: Injector,
    private store: Store<fromColaborador.AppState>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.store.dispatch(new colaboradorActions.LoadColaboradores());
    this.colaboradores$ = this.store.pipe(
      select(fromColaborador.getColaboradores)
    );
    this.error$ = this.store.pipe(select(fromColaborador.getError));
    let columns: IDynamicTableBuilder[] = [
      {
        name: 'nome',
        label: 'Nome',
      },
      {
        name: 'telefone',
        label: 'Telefone',
        type: FieldType.phone,
      },
      {
        name: 'funcao',
        label: 'Função',
      },
    ];
    this.montaTabela({
      columns: columns,
      service: this.colaboradorService.getColaboradores(),
      component: ColaboradorFormComponent,
      caminho: '',
      dados: this.colaboradores$,
    });
    
  }

  update(colaborador: Colaborador) {   
    //debugger 
    this.store.dispatch(new colaboradorActions.LoadColaborador(colaborador.id));
  }
  remove(doc) {
    this.store.dispatch(new colaboradorActions.DeleteColaborador(doc));
  }
}
