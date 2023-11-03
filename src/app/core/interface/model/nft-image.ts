import { NftModel } from './nft-model';

export interface NftImage {
  path?: string;
  updatedAt?: Date;
  nftModel?: NftModel;
  id: 0;
  name: string;
}
