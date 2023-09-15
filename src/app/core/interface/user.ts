export interface User {
  id?: number;
  email: string;
  password: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  birthday?: Date;
  nfts?: any[];
}
