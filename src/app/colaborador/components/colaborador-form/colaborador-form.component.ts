import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { ColaboradorResource } from '../../classes/colaborador-resource';

import { Store } from '@ngrx/store';
import * as colaboradorActions from '../../state/colaborador.actions';
import * as fromColaborador from '../../state/colaborador.reducer';
import { Colaborador } from '../../models/colaborador';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html',
  styleUrls: ['./colaborador-form.component.css'],
})
export class ColaboradorFormComponent extends ColaboradorResource
  implements OnInit, OnDestroy {
  funcoes: any[] = ['Monitor', 'Psicólogo', 'Assistente Social'];
  colaborador$: Observable<Colaborador>;
  subscription: Subscription;
  constructor(
    protected injector: Injector,
    private store: Store<fromColaborador.AppState>
  ) {
    super(injector);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: undefined,
      id: null,
      path: 'colaborador',
      nome: [''],
      cpf: [''],
      telefone: [''],
      email: [''],
      funcao: [''],
    });

    this.colaborador$ = this.store.select(
      fromColaborador.getCurrentColaborador
    );

    this.subscription = this.colaborador$.subscribe((currentCustomer) => {
      console.log(currentCustomer);
      if (currentCustomer) {
        this.form.patchValue({ ...currentCustomer });
      }
    });
    /* this._id !== undefined
      ? this.colaboradorService
          .getColaboradorById(this._id)
          .subscribe((res: any) => {
            this.form.patchValue(res);
          })
      : null;
      */
  }

  save() {
    if (this.form.get('_id').value == undefined) {
      const newColaborador: Colaborador = {
        ...this.form.value,
      };
      this.store.dispatch(
        new colaboradorActions.CreateColaborador(newColaborador)
      );
      this.toastr.success('Salvo');
      // this.selectedRow.emit(res);
      this.saved.emit(true);
    } else {
      let colaborador: Colaborador = { ...this.form.value };
      colaborador.id = colaborador._id;
      this.store.dispatch(
        new colaboradorActions.UpdateColaborador(colaborador)
      );
      this.toastr.success('Salvo');
      this.saved.emit(true);
    }
  }
}
