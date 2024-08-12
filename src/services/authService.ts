import Http from '@/helpers/http';
import { IAccount } from '@/types/auth.type';

const http = new Http();

export const register = async (newAccount: IAccount) => {
  try {
    const data = await http.post('/register', newAccount);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data: IAccount) => {
  try {
    const auth = await http.post('/login', data);
    return auth;
  } catch (error) {
    console.log(error);
  }
};
