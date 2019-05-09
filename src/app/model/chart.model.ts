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
