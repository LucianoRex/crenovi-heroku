import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ColaboradorService } from '../services/colaborador.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as ColaboradorActions from './colaborador.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Colaborador } from '../models/colaborador';

@Injectable()
export class ColaboradorEffect {
  constructor(
    private actions$: Actions,
    private colaboradorService: ColaboradorService
  ) {}

  @Effect()
  loadColaboradores$: Observable<Action> = this.actions$.pipe(
    ofType<ColaboradorActions.LoadColaboradores>(
      ColaboradorActions.ColaboradorActionTypes.LOAD_COLABORADORES
    ),
    mergeMap((action: ColaboradorActions.LoadColaboradores) =>
      this.colaboradorService.getColaboradores().pipe(
        map((colaboradores: Colaborador[]) => {         
          return new ColaboradorActions.LoadColaboradoresSuccess(colaboradores);
        }),
        catchError((error) =>
          of(new ColaboradorActions.LoadColaboradoresFail(error))
        )
      )
    )
  );
  
  @Effect()
  loadColaborador$: Observable<Action> = this.actions$.pipe(
    ofType<ColaboradorActions.LoadColaborador>(
      ColaboradorActions.ColaboradorActionTypes.LOAD_COLABORADOR
    ),
    mergeMap((action: ColaboradorActions.LoadColaborador) =>
      this.colaboradorService.getColaboradorById(action.payload).pipe(
        map(
          (colaborador: Colaborador) =>
            new ColaboradorActions.LoadColaboradorSuccess(colaborador)
        ),
        catchError((error) =>
          of(new ColaboradorActions.LoadColaboradorFail(error))
        )
      )
    )
  );

  @Effect()
  createColaborador$: Observable<Action> = this.actions$.pipe(
    ofType<ColaboradorActions.CreateColaborador>(
      ColaboradorActions.ColaboradorActionTypes.CREATE_COLABORADOR
    ),
    map((action: ColaboradorActions.CreateColaborador) => action.payload),
    mergeMap((colaborador: Colaborador) =>
      this.colaboradorService.createColaborador(colaborador).pipe(
        map(
          (newColaborador: Colaborador) =>
            new ColaboradorActions.CreateColaboradorSuccess(newColaborador)
        ),
        catchError((error) =>
          of(new ColaboradorActions.CreateColaboradorFail(error))
        )
      )
    )
  );

  @Effect()
  updateColaborador$: Observable<Action> = this.actions$.pipe(
    ofType<ColaboradorActions.UpdateColaborador>(
      ColaboradorActions.ColaboradorActionTypes.UPDATE_COLABORADOR
    ),
    map((action: ColaboradorActions.UpdateColaborador) => action.payload),
    mergeMap((colaborador: Colaborador) =>
      this.colaboradorService.updateColaborador(colaborador).pipe(
        map(
          (updateColaborador: Colaborador) =>
            new ColaboradorActions.UpdateColaboradorSuccess({
              id: updateColaborador.id,
              changes: updateColaborador,
            }),            
        ),
        catchError((error) =>
          of(new ColaboradorActions.UpdateColaboradorFail(error))
        )
      )
    )
  );

  @Effect()
  deleteColaborador$: Observable<Action> = this.actions$.pipe(
    ofType<ColaboradorActions.DeleteColaborador>(
      ColaboradorActions.ColaboradorActionTypes.DELETE_COLABORADOR
    ),
    map((action: ColaboradorActions.DeleteColaborador) => action.payload),
    mergeMap((id: number) =>
      this.colaboradorService.deleteColaborador(id).pipe(
        map(() => new ColaboradorActions.DeleteColaboradorSuccess(id)),
        catchError((error) =>
          of(new ColaboradorActions.DeleteColaboradorFail(error))
        )
      )
    )
  );
  
}
