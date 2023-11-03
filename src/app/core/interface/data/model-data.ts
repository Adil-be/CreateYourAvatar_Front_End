import { NftModel } from '../model/nft-model';

export interface ModelData {
  'hydra:member': NftModel[];
  'hydra:totalItems': number;
  'hydra:view': {
    '@id': string;
    '@type': string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:next': string;
    'hydra:previous': string;
  };
}
