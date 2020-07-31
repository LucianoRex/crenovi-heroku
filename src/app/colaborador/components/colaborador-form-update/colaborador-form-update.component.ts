import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Colaborador } from '../../models/colaborador';
import { ColaboradorResource } from '../../classes/colaborador-resource';
import * as colaboradorActions from '../../state/colaborador.actions';
import * as fromColaborador from '../../state/colaborador.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-colaborador-form-update',
  templateUrl: './colaborador-form-update.component.html',
  styleUrls: ['./colaborador-form-update.component.css'],
})
export class ColaboradorFormUpdateComponent extends ColaboradorResource
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
    let colaborador: Colaborador = { ...this.form.value };    
    console.log(colaborador);
    this.store.dispatch(new colaboradorActions.UpdateColaborador(colaborador));

    this.saved.emit(true);
  }
}
