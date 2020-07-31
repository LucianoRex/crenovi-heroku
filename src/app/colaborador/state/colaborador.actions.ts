import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Colaborador } from '../models/colaborador';

export enum ColaboradorActionTypes {
  LOAD_COLABORADORES = '[Colaborador] Load Colaboradores',
  LOAD_COLABORADORES_SUCCESS = '[Colaborador] Load Colaboradores Success',
  LOAD_COLABORADORES_FAIL = '[Colaborador] Load Colaboradores Fail',

  LOAD_COLABORADOR = '[Colaborador] Load Colaborador',
  LOAD_COLABORADOR_SUCCESS = '[Colaborador] Load Colaborador Success',
  LOAD_COLABORADOR_FAIL = '[Colaborador] Load Colaborador Fail',

  CREATE_COLABORADOR = '[Colaborador] Create Colaborador',
  CREATE_COLABORADOR_SUCCESS = '[Colaborador] Create Colaborador Success',
  CREATE_COLABORADOR_FAIL = '[Colaborador] Create Colaborador Fail',

  UPDATE_COLABORADOR = '[Colaborador] Update Colaborador',
  UPDATE_COLABORADOR_SUCCESS = '[Colaborador] Update Colaborador Success',
  UPDATE_COLABORADOR_FAIL = '[Colaborador] Update Colaborador Fail',

  DELETE_COLABORADOR = '[Colaborador] Delete Colaborador',
  DELETE_COLABORADOR_SUCCESS = '[Colaborador] Delete Colaborador Success',
  DELETE_COLABORADOR_FAIL = '[Colaborador] Delete Colaborador Fail',
}

export class LoadColaboradores implements Action {
  readonly type = ColaboradorActionTypes.LOAD_COLABORADORES;
  
}

export class LoadColaboradoresSuccess implements Action {
  readonly type = ColaboradorActionTypes.LOAD_COLABORADORES_SUCCESS;
  constructor(public payload: Colaborador[]) {    
  }
}
export class LoadColaboradoresFail implements Action {
  readonly type = ColaboradorActionTypes.LOAD_COLABORADORES_FAIL;
  constructor(public payload: string) {}
}

export class LoadColaborador implements Action {
  readonly type = ColaboradorActionTypes.LOAD_COLABORADOR;
  constructor(public payload: number) {}
}
export class LoadColaboradorSuccess implements Action {
  readonly type = ColaboradorActionTypes.LOAD_COLABORADOR_SUCCESS;
  constructor(public payload: Colaborador) {}
}
export class LoadColaboradorFail implements Action {
  readonly type = ColaboradorActionTypes.LOAD_COLABORADOR_FAIL;
  constructor(public payload: string) {}
}

export class CreateColaborador implements Action {
  readonly type = ColaboradorActionTypes.CREATE_COLABORADOR;
  constructor(public payload: Colaborador) {}
}
export class CreateColaboradorSuccess implements Action {
  readonly type = ColaboradorActionTypes.CREATE_COLABORADOR_SUCCESS;
  constructor(public payload: Colaborador) {}
}
export class CreateColaboradorFail implements Action {
  readonly type = ColaboradorActionTypes.CREATE_COLABORADOR_FAIL;
  constructor(public payload: string) {}
}

export class UpdateColaborador implements Action {
  readonly type = ColaboradorActionTypes.UPDATE_COLABORADOR;
  constructor(public payload: Colaborador) {}
}
export class UpdateColaboradorSuccess implements Action {
  readonly type = ColaboradorActionTypes.UPDATE_COLABORADOR_SUCCESS;
  constructor(public payload: Update<Colaborador>) {}
}
export class UpdateColaboradorFail implements Action {
  readonly type = ColaboradorActionTypes.UPDATE_COLABORADOR_FAIL;
  constructor(public payload: string) {}
}

export class DeleteColaborador implements Action {
  readonly type = ColaboradorActionTypes.DELETE_COLABORADOR;
  constructor(public payload: any) {}
}
export class DeleteColaboradorSuccess implements Action {
  readonly type = ColaboradorActionTypes.DELETE_COLABORADOR_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteColaboradorFail implements Action {
  readonly type = ColaboradorActionTypes.DELETE_COLABORADOR_FAIL;
  constructor(public payload: string) {}
}

export type Action2 =
  | LoadColaboradores
  | LoadColaboradoresSuccess
  | LoadColaboradoresFail
  | LoadColaborador
  | LoadColaboradorSuccess
  | LoadColaboradorFail
  | CreateColaborador
  | CreateColaboradorSuccess
  | CreateColaboradorFail
  | UpdateColaborador
  | UpdateColaboradorSuccess
  | UpdateColaboradorFail
  | DeleteColaborador
  | DeleteColaboradorSuccess
  | DeleteColaboradorFail;
