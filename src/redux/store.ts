import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import statisticReducer from './slices/statisticSlice';
import spendlimitReducer from './slices/spendlimitSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    statistic: statisticReducer,
    spendlimit: spendlimitReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
