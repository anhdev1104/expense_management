import { TransactionType } from '@/constants/transaction';
import { ICategory } from './category.type';

export interface ITransaction {
  _id?: string;
  type: TransactionType.EXPENSE | TransactionType.INCOME | string;
  date: string | Date;
  description?: string;
  money: number;
  category: ICategory;
}
