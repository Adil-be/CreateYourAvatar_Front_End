export type order = 'desc' | 'asc' | 'DESC' | 'ASC';
export type ParamModel ={
  'order[initialPrice]'?: order;
  'initialPrice[gt]'?: number;
  'initialPrice[lt]'?: number;
  'order[createdAt]'?: order;
  'name'?: string;
  'order[quantity]'?: order;
  'nftCollection.name'?: string;
  'description'?: string;
}
