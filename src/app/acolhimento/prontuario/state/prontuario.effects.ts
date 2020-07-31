import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProntuarioService } from '../services/prontuario.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as ProntuarioActions from './prontuario.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Prontuario } from '../models/prontuario';

@Injectable()
export class ProntuarioEffect {
  constructor(
    private actions$: Actions,
    private prontuarioService: ProntuarioService
  ) {}
  @Effect()
  loadProntuarios$: Observable<Action> = this.actions$.pipe(
    ofType<ProntuarioActions.LoadProntuarios>(
      ProntuarioActions.ProntuarioActionTypes.LOAD_PRONTUARIOS
    ),
    mergeMap((actions: ProntuarioActions.LoadProntuarios) =>
      this.prontuarioService.getProntuarios().pipe(
        map(
          (prontuarios: Prontuario[]) =>
            new ProntuarioActions.LoadProntuariosSuccess(prontuarios)
        ),
        catchError((error) =>
          of(new ProntuarioActions.LoadProntuariosFail(error))
        )
      )
    )
  );

  @Effect()
  loadProntuario$: Observable<Action> = this.actions$.pipe(
    ofType<ProntuarioActions.LoadProntuario>(
      ProntuarioActions.ProntuarioActionTypes.LOAD_PRONTUARIO
    ),
    mergeMap((action: ProntuarioActions.LoadProntuario) =>
      this.prontuarioService.getProntuarioById(action.payload).pipe(
        map((prontuario: Prontuario) => {
          console.log(prontuario);
          return new ProntuarioActions.LoadProntuarioSuccess(prontuario);
        }),
        catchError((error) =>
          of(new ProntuarioActions.LoadProntuarioFail(error))
        )
      )
    )
  );
}
