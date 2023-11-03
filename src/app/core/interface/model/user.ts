import { Nft } from './nft';

export interface User {
  id: number;
  email: string;
  password?: string;
  username: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  birthday?: Date;
  address?: string;
  nfts?: Nft[] | string[];
  userImage?: any;
}
