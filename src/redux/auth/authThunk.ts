import { login } from '@/services/authService';
import { IAccount } from '@/types/auth.type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAuth = createAsyncThunk('auth/loginAuth', async (data: IAccount, thunkAPI) => {
  try {
    const auth = await login(data);
    return auth;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
