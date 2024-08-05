import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import statisticSlice from './slices/statisticSlice';

const store = configureStore({
  reducer: {
    statistic: statisticSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
