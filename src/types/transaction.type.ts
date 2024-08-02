import { TransactionType } from '@/enum/transaction';

export interface ITransaction {
  _id?: string;
  type: TransactionType.EXPENSE | TransactionType.INCOME | string;
  date: string | Date;
  description?: string;
  money: number;
  category: string;
}
