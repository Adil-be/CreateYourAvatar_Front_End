export type GraphData = DataSerie[];

export type dataPoint = {
  value: number;
  name: Date | string;
};

export type DataSerie = {
  name: string;
  series: dataPoint[];
};
