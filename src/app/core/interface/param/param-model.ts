export type order = 'desc' | 'asc' | 'DESC' | 'ASC';
export type ParamModel = {
  'order[initialPrice]'?: order;
  featured?: boolean;
  'initialPrice[gt]'?: number;
  'initialPrice[lt]'?: number;
  'order[createdAt]'?: order;
  name?: string;
  'order[quantity]'?: order;
  'nftCollection.name'?: string;
  description?: string;
  'nftCollection.id'?: number;
  'nft.user.id'?: number;
};
