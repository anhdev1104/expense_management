import { TransactionType } from '@/constants/transaction';

export interface ICategory {
  _id: string;
  name: string | undefined;
  type: TransactionType.EXPENSE | TransactionType.INCOME;
  icon: string;
}
