export type TransactionsListItemProps = {
  id: string;
  date: string;
  from: string;
  to: string;
  value: string;
};

export type TransactionDialogProps = {
  open: boolean;
  handleClickOpen: () => void;
} & TransactionsListItemProps;
