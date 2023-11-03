import { NftModel } from './nft-model';

export interface NftValue {
  valueDate: Date;
  value: number;
  nftModel: string | NftModel;
}
