import Http from '@/helpers/http';
import { ITransaction } from '@/types/transaction.type';

const http = new Http();

export const getTransaction = async (type = '') => {
  try {
    const data = await http.get('/transaction', type);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addTransaction = async (newTransaction: ITransaction) => {
  try {
    const data = await http.post('/transaction', newTransaction);
    return data;
  } catch (error) {
    console.log(error);
  }
};
