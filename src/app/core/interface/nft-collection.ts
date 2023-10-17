import { NftModel } from './nft-model';

export interface NftCollection {
  NftModels?: NftModel[];
  path?: string;
  description?: string;
  id: 0;
  name: string;
}
