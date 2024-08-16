import { IAuth } from '@/types/auth.type';
import { createSlice } from '@reduxjs/toolkit';
import { loginAuth } from './authThunk';

const initialState: {
  data: IAuth | null;
  loading: boolean;
  error: string | undefined | null;
} = {
  data: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, { payload }) => {
      if (state.data && payload.accessToken) {
        state.data.accessToken = payload.accessToken;
      }
    },
    logoutAuth: state => {
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAuth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { refreshToken, logoutAuth } = authSlice.actions;

export default authSlice.reducer;
