import { Nft } from "./nft";

export interface NftData {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:totalItems': number;
  'hydra:member': Nft[];
  'hydra:view': {
    '@id': string;
    '@type': string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:next': string;
    'hydra:previous': string;
  };
  'hydra:search': {
    '@type': string;
    'hydra:template': string;
    'hydra:variableRepresentation': string;
  };
}
