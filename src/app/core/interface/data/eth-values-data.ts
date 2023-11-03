export interface EthValuesData {
  Data: {
    Aggregated: boolean;
    Data: Array<DataEth>;
    TimeFrom: number;
    TimeTo: number;
  };
  HasWarning: false;
  Message: string;
  RateLimit: {};
  Response: 'Success';
  Type: number;
}

export interface DataEth {
  close: number;
  conversionSymbol: string;
  conversionType: string;
  high: number;
  low: number;
  open: number;
  time: number;
  volumefrom: number;
  volumeto: number;
}
