import * as prontuarioActions from './prontuario.actions';
import { Prontuario } from '../models/prontuario';
import * as fromRoot from '../../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProntuarioState extends EntityState<Prontuario> {
  selectedProntuarioId: number | null;  
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  prontuarios: ProntuarioState;
}

export const prontuarioAdapter: EntityAdapter<Prontuario> = createEntityAdapter<
  Prontuario
>();
export const defaultProntuario: ProntuarioState = {
  ids: [],
  entities: {},
  selectedProntuarioId: null, 
  loading: false,
  loaded: false,
  error: '',
};
export const initialState = prontuarioAdapter.getInitialState(
  defaultProntuario
);

export function ProntuarioReducer(
  state = initialState,
  action: prontuarioActions.Action2
): ProntuarioState {
  switch (action.type) {

    case prontuarioActions.ProntuarioActionTypes.LOAD_PRONTUARIOS_SUCCESS: {
      return prontuarioAdapter.addAll(action.payload, {
        ...state,
        loading: true,
        loaded: true,
      });
    }
    case prontuarioActions.ProntuarioActionTypes.LOAD_PRONTUARIOS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case prontuarioActions.ProntuarioActionTypes.LOAD_PRONTUARIO_SUCCESS: {
      return prontuarioAdapter.addOne(action.payload, {
        ...state,
        selectedProntuarioId: action.payload.id
      });
    }
    case prontuarioActions.ProntuarioActionTypes.LOAD_PRONTUARIO_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }
    
    default: {
      return state;
    }
  }
}

const getProntuarioFeatureState = createFeatureSelector<ProntuarioState>(
  'prontuarios'
);
export const getProntuarios = createSelector(
  getProntuarioFeatureState,
  prontuarioAdapter.getSelectors().selectAll
);

export const getProntuariosLoading = createSelector(
  getProntuarioFeatureState,
  (state: ProntuarioState) => state.loading
);

export const getProntuariosLoaded = createSelector(
  getProntuarioFeatureState,
  (state: ProntuarioState) => state.loaded
);

export const getError = createSelector(
  getProntuarioFeatureState,
  (state: ProntuarioState) => state.error
);

export const getCurrentProntuarioId = createSelector(
  getProntuarioFeatureState,
  (state: ProntuarioState) => state.selectedProntuarioId
);
export const getCurrentProntuario = createSelector(
  getProntuarioFeatureState,
  getCurrentProntuarioId,
  state => state.entities[state.selectedProntuarioId]
);