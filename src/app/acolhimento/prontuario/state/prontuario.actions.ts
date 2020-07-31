import { Action } from '@ngrx/store';

import { Prontuario } from '../models/prontuario';
import { Update } from '@ngrx/entity';

export enum ProntuarioActionTypes {
  LOAD_PRONTUARIOS = '[Prontuario] Load Prontuarios',
  LOAD_PRONTUARIOS_SUCCESS = '[Prontuario] Load Prontuarios Success',
  LOAD_PRONTUARIOS_FAIL = '[Prontuario] Load Prontuario Fail',

  LOAD_PRONTUARIO = '[Prontuario] Load Prontuario',
  LOAD_PRONTUARIO_SUCCESS = '[Prontuario] Load Prontuario Success',
  LOAD_PRONTUARIO_FAIL = '[Prontuario] Load Prontuario Fail',

  UPDATE_PRONTUARIO = '[Prontuario] Update Prontuario',
  UPDATE_PRONTUARIO_SUCCESS = '[Prontuario] Update Prontuario Success',
  UPDATE_PRONTUARIO_FAIL = '[Prontuario] Update Prontuario Fail',
}

export class LoadProntuarios implements Action {
  readonly type = ProntuarioActionTypes.LOAD_PRONTUARIOS;
}

export class LoadProntuariosSuccess implements Action {
  readonly type = ProntuarioActionTypes.LOAD_PRONTUARIOS_SUCCESS;
  constructor(public payload: Prontuario[]) {}
}
export class LoadProntuariosFail implements Action {
  readonly type = ProntuarioActionTypes.LOAD_PRONTUARIOS_FAIL;
  constructor(public payload: string) {}
}

export class LoadProntuario implements Action {
  readonly type = ProntuarioActionTypes.LOAD_PRONTUARIO;
  constructor(public payload: number) {}
}

export class LoadProntuarioSuccess implements Action {
  readonly type = ProntuarioActionTypes.LOAD_PRONTUARIO_SUCCESS;
  constructor(public payload: Prontuario) {}
}
export class LoadProntuarioFail implements Action {
  readonly type = ProntuarioActionTypes.LOAD_PRONTUARIO_FAIL;
  constructor(public payload: string) {}
}

export class UpdateProntuario implements Action {
  readonly type = ProntuarioActionTypes.UPDATE_PRONTUARIO;

  constructor(public payload: Prontuario) {}
}

export class UpdateProntuarioSuccess implements Action {
  readonly type = ProntuarioActionTypes.UPDATE_PRONTUARIO_SUCCESS;

  constructor(public payload: Update<Prontuario>) {}
}

export class UpdateProntuarioFail implements Action {
  readonly type = ProntuarioActionTypes.UPDATE_PRONTUARIO_FAIL;

  constructor(public payload: string) {}
}

export type Action2 =
  | LoadProntuarios
  | LoadProntuariosSuccess
  | LoadProntuariosFail
 | LoadProntuario
  | LoadProntuarioSuccess
  | LoadProntuarioFail
  | UpdateProntuario
  | UpdateProntuarioSuccess
  | UpdateProntuarioFail;
