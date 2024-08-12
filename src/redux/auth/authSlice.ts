import { login } from '@/services/authService';
import { IAccount, IAuth } from '@/types/auth.type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthInit {
  data: IAuth;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: IAuthInit = {
  data: {
    accessToken: '',
    data: {},
    expiresIn: '',
  },
  loading: false,
  error: null,
};

export const loginAuth = createAsyncThunk('auth/loginAuth', async (data: IAccount, thunkAPI) => {
  try {
    const auth = await login(data);
    return auth;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuth.fulfilled, (state, action: PayloadAction<IAuth>) => {
        console.log('🚀 ~ .addCase ~ payload:', action.payload);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
