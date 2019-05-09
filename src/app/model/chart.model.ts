export interface Chart {
  labels: string[];
  datasets: Datasets[];
}

interface Datasets {
  label: string;
  data: number[];
}
