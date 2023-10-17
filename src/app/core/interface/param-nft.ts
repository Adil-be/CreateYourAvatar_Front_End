export type order = 'desc' | 'asc' | 'DESC' | 'ASC';

export type ParamNft = {

  'order[sellingPrice]'?: order;
  'order[purchaseDate]'?: order;
  inSale?: boolean;
  featured?: boolean;
  'order[nftModel.createdAt]'?: order;
  'user.id'?: number;
  'sellingPrice[gt]'?: number;
  'sellingPrice[lt]'?: number;
  'nftModel.name'?: string;
  'nftModel.description'?: string;
};
