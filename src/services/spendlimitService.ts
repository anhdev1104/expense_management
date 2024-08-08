import Http from '@/helpers/http';
import { ISpendlimit } from '@/types/spendlimit.type';

const http = new Http();

export const getSpendlimit = async (id: string = '') => {
  try {
    const data = await http.get('/spendlimit', id);
    return data;
  } catch (error) {
    return error;
  }
};

export const addSpendlimit = async (newSpendlimit: ISpendlimit) => {
  try {
    const data = await http.post('/spendlimit', newSpendlimit);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteSpendlimit = async (category: string) => {
  try {
    const data = await http.delete('/spendlimit', category);
    return data;
  } catch (error) {
    return error;
  }
};
