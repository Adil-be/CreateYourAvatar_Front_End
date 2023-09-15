import { User } from "./user";

export interface Nft {
  id: number;
  buyingPrice: number;
  sellingPrice: number;
  token: string;
  inSale: boolean;
  purchaseDate: Date;
  NftValues: any[];
  nftModel: any;
  user: User;
}
