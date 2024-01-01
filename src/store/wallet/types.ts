export type walletDTO = {
  id: number;
  name: string;
  amount: number;
};

export type walletSliceState = {
  couponList: walletDTO[];
};
