export type SafeTransactionBody = {
  pk: string;
  amount: string;
  destination: string;
};

export type FundUserTransactionBody = {
  destination: string;
};

export type AddressTransactionBody = {
  address: string;
}

export type UserManagementTransactionBody = {
  pk: string;
  address: string;
}

export type ExecuteUserTransactionBody = {
  pk: string;
  amount: string;
  destination: string;
}
