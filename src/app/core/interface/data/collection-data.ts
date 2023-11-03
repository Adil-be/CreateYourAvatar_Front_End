import { NftCollection } from '../model/nft-collection';

export interface CollectionData {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': NftCollection[];
  'hydra:totalItems': number;
}
