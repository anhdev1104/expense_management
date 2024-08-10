import Http from '@/helpers/http';
import { IAccount } from '@/types/auth.type';

const http = new Http();

export const register = async (newAccount: IAccount) => {
  try {
    const data = await http.post('/accounts', newAccount);
    return data;
  } catch (error) {
    console.log(error);
  }
};
