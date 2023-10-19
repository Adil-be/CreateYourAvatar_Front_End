type order = 'desc' | 'asc' | 'DESC' | 'ASC';

export type ParamNftValue = {
  'order[valueDate]'?: order;
  'nftModel.id'?: number;
};
