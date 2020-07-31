import * as colaboradorActions from './colaborador.actions';
import { Colaborador } from '../models/colaborador';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ColaboradorState extends EntityState<Colaborador> {
  selectedColaboradorId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  colaboradores: ColaboradorState;
}

export const colaboradorAdapter: EntityAdapter<Colaborador> = createEntityAdapter<
  Colaborador
>();

export const defaultColaborador: ColaboradorState = {
  ids: [],
  entities: {},
  selectedColaboradorId: null,
  loading: false,
  loaded: false,
  error: '',
};
export const initialState = colaboradorAdapter.getInitialState(
  defaultColaborador
);

export function ColaboradorReducer(
  state = initialState,
  action: colaboradorActions.Action2
): ColaboradorState {
  switch (action.type) {
    case colaboradorActions.ColaboradorActionTypes.LOAD_COLABORADORES_SUCCESS: {      
      return colaboradorAdapter.addAll(action.payload, {
        ...state,
        loading: true,
        loaded: true,
      });
    }
    case colaboradorActions.ColaboradorActionTypes.LOAD_COLABORADORES_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case colaboradorActions.ColaboradorActionTypes.LOAD_COLABORADOR_SUCCESS: {
      return colaboradorAdapter.addOne(action.payload, {
        ...state,
        selectedColaboradorId: action.payload.id,
      });
    }
    case colaboradorActions.ColaboradorActionTypes.LOAD_COLABORADOR_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case colaboradorActions.ColaboradorActionTypes.CREATE_COLABORADOR_SUCCESS: {
      return colaboradorAdapter.addOne(action.payload, state);
    }
    case colaboradorActions.ColaboradorActionTypes.CREATE_COLABORADOR_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case colaboradorActions.ColaboradorActionTypes.UPDATE_COLABORADOR_SUCCESS: {
      return colaboradorAdapter.updateOne(action.payload, state);
    }
    case colaboradorActions.ColaboradorActionTypes.UPDATE_COLABORADOR_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case colaboradorActions.ColaboradorActionTypes.DELETE_COLABORADOR_SUCCESS: {
      return colaboradorAdapter.removeOne(action.payload, state);
    }
    case colaboradorActions.ColaboradorActionTypes.DELETE_COLABORADOR_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const getColaboradorFeatureState = createFeatureSelector<ColaboradorState>(
  'colaboradores'
);
export const getColaboradores = createSelector(
  getColaboradorFeatureState,
  colaboradorAdapter.getSelectors().selectAll
);

export const getColaboradoresLoading = createSelector(
  getColaboradorFeatureState,
  (state: ColaboradorState) => state.loading
);

export const getColaboradoresLoaded = createSelector(
  getColaboradorFeatureState,
  (state: ColaboradorState) => state.loaded
);

export const getError = createSelector(
  getColaboradorFeatureState,
  (state: ColaboradorState) => state.error
);

export const getCurrentColaboradorId = createSelector(
  getColaboradorFeatureState,
  (state: ColaboradorState) => state.selectedColaboradorId
);

export const getCurrentColaborador = createSelector(
  getColaboradorFeatureState,
  getCurrentColaboradorId,
  (state) => state.entities[state.selectedColaboradorId]
);
