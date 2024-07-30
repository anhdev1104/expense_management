import { TransactionType } from '@/enum/transaction';

export interface ITransaction {
  type: TransactionType.EXPENSE | TransactionType.INCOME;
  date: string;
  description?: string;
  money: number;
  category: string;
}
