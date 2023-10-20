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

export type AddUserTransactionBody = {
  userAddress: string;
}

export type RemoveUserTransactionBody = {
  userAddress: string;
}

export type ExecuteUserTransactionBody = {
  pk: string;
  amount: string;
  destination: string;
}
