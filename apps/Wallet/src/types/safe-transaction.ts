export type SafeTransactionBody = {
  pk: string;
  amount: string;
  destination: string;
};

export type FundUserTransactionBody = {
  destination: string;
};

export type AddOwnerTransactionBody = {
  ownerAddress: string;
}
