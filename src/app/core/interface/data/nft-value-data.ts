import { NftValue } from '../model/nft-value';

export interface NftValueData {
  'hydra:member': NftValue[];
  'hydra:totalItems': number;
  'hydra:view': {
    '@id': string;
    type: string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:previous': string;
    'hydra:next': string;
  };
  'hydra:search': {
    '@type': string;
    'hydra:template': string;
    'hydra:variableRepresentation': string;
    'hydra:mapping': [
      {
        '@type': string;
        variable: string;
        property: string;
        required: true;
      }
    ];
  };
}
