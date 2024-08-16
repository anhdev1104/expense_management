import axios from 'axios';
import { IAccount } from '@/types/auth.type';

export const register = async (newAccount: IAccount) => {
  try {
    const res = await axios.post('http://localhost:8080/api/v1/register', newAccount, { withCredentials: true });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const login = async (data: IAccount) => {
  try {
    const auth = await axios.post('http://localhost:8080/api/v1/login', data, { withCredentials: true });
    return auth.data;
  } catch (error) {
    return error;
  }
};
