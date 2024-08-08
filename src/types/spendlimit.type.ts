import { ICategory } from './category.type';

export interface ISpendlimit {
  _id?: string;
  date: Date | string;
  moneylimit: number;
  category: ICategory;
}
