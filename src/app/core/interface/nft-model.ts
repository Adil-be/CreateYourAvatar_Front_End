import { Nft } from './nft';
import { NftCollection } from './nft-collection';
import { NftImage } from './nft-image';

export interface NftModel {
  id: number;
  name: string;
  initialPrice?: number;
  quantity?: number;
  createdAt?: Date;
  description?: string;
  nft?: Nft[];
  nftCollection?: NftCollection | string;
  categories?: any[];
  nftImages?: NftImage[];
}
