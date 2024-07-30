import { TransactionType } from '@/enum/transaction';

export interface ICategory {
  name: string;
  type: TransactionType.EXPENSE | TransactionType.INCOME;
  icon: string;
}
