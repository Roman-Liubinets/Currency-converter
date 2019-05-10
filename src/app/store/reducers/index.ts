import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';

import * as fromReducer from './converter.reducer';

export interface State {
  data: fromReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  data: fromReducer.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

export const getDataState = createFeatureSelector<fromReducer.State>('data');
export const getAmountTo = createSelector(getDataState, fromReducer.getAmoutTo);
export const switchCase = createSelector(getDataState, fromReducer.switchCase);
export const chartData = createSelector(getDataState, fromReducer.chartData);
export const loaded = createSelector(getDataState, fromReducer.loaded);
