import * as converterAction from '../actions/converter.action';
import * as model from '../../model/chart.model';

export interface State {
  amoutTo: string;
  chart: model.Chart;
  currency: model.Currency;
  switchCase: boolean;
  loaded: boolean;
}

export const initialState: State = {
  amoutTo: null,
  chart: {
    labels: null,
    datasets: []
  },
  currency: {
    haveCurrency: null,
    wantCurrency: null,
    switchCase: false
  },
  switchCase: false,
  loaded: false
};
const returnAmount = (data, switchC) =>
  data.rates[Object.keys(data.rates)[!switchC ? 0 : 1]];

export function reducer(state = initialState, action: converterAction.Action) {
  switch (action.type) {
    case converterAction.GET_AMOUNT: {
      const currency = action.payload;
      return { ...state, currency };
    }
    case converterAction.GET_AMOUNT_SUCCESS: {
      const amoutTo = returnAmount(action.payload, action.switchCase);
      return { ...state, amoutTo, loaded: true };
    }
    case converterAction.GET_AMOUNT_FAILURE: {
      return { ...state, loaded: false };
    }
    case converterAction.SWITCH_AMOUNT: {
      return { ...state };
    }
    case converterAction.SWITCH_AMOUNT_SUCCESS: {
      const switchCase = action.payload;
      return { ...state, switchCase };
    }
    default:
      return state;
  }
}

// function returnAmount(data, switch) {
//   return data.rates[Object.keys(data.rates)[0]]
//   }

// ******************************** SELECTORS ********************************
export const getAmoutTo = (data: State) => data.amoutTo;
export const switchCase = (data: State) => data.switchCase;
export const loaded = (data: State) => data.loaded;
