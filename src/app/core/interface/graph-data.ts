export type GraphData = DataSerie[];

export type dataPoint = {
  value: number;
  name: Date;
};

export type DataSerie = {
  name: string;
  series: dataPoint[];
};
