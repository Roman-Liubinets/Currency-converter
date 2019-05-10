import * as converterAction from '../actions/converter.action';
import * as model from '../../model/chart.model';

export interface State {
  amoutTo: string;
  chart: any;
  currency: model.Currency;
  switchCase: boolean;
  historicalRequest: model.HistoricalRequest;
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
  historicalRequest: {
    startDate: null,
    endDate: null,
    haveCurrency: null,
    wantCurrency: null,
    switchCase: false
  },

  loaded: false
};
const returnAmount = (data, switchC) =>
  data.rates[Object.keys(data.rates)[!switchC ? 0 : 1]];
const getResponseData = (data, switchC) => {
  let cases = {
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  };
  const labels = Object.keys(data.rates).sort();
  cases.labels = labels.filter((item, index) => index % 2 === 0);
  const values = Object.values(data.rates);
  const allDate = values.map(
    items => Object.entries(items)[!switchC ? 0 : 1][1]
  );
  const filterDate = allDate.filter((item, index) => index % 2 === 0);
  cases.datasets.forEach(elemet => {
    elemet.data = filterDate;
  });
  return cases;
};

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
    case converterAction.GET_HISTORICAL_DATA: {
      const historicalRequest = action.payload;
      return { ...state, historicalRequest };
    }
    case converterAction.GET_HISTORICAL_DATA_SUCCESS: {
      return {
        ...state,
        chart: getResponseData(action.payload, action.switchCase)
      };
    }
    case converterAction.GET_HISTORICAL_DATA_FAILURE: {
      return { ...state };
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

// ******************************** SELECTORS ********************************
export const getAmoutTo = (data: State) => data.amoutTo;
export const switchCase = (data: State) => data.switchCase;
export const chartData = (data: State) => data.chart;
export const loaded = (data: State) => data.loaded;
