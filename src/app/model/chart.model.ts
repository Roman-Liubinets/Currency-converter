export interface Currency {
  haveCurrency: string;
  wantCurrency: string;
  switchCase: boolean;
}

export interface Chart {
  labels: string[];
  datasets: Datasets[];
}

interface Datasets {
  label: string;
  data: number[];
}
export interface HistoricalRequest {
  startDate: string;
  endDate: string;
  haveCurrency: string;
  wantCurrency: string;
  switchCase: boolean;
}
