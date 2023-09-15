import { NftModel } from './nft-model';

export interface NftCollection {
  NftModels?: NftModel[];
  path?: string;
  id: 0;
  name: string;
}
