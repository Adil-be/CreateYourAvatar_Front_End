import { Nft } from './nft';
import { NftCollection } from './nft-collection';
import { NftImage } from './nft-image';

export interface NftModel {
  id: number;
  name: string;
  initialPrice?: number;
  createdAt?: Date;
  description?: string;
  nft?: Nft[];
  nftCollection?: NftCollection;
  categories?: any[];
  nftImages?: NftImage[];
}
