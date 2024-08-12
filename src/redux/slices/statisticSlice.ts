import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTransactionByDate } from '@/services/transactionService';
import { ITransaction } from '@/types/transaction.type.ts';

interface IStatisticData {
  data: ITransaction[];
  loading: boolean;
  error: string | undefined | null;
}

type IDateInit = {
  month: number | string;
  year: number;
};

export const getStatistic = createAsyncThunk('data/getStatistic', async (date: IDateInit, thunkAPI) => {
  try {
    const { month = '', year = '' } = date;
    const data = await getTransactionByDate(month, year);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const initialState: IStatisticData = {
  data: [],
  loading: false,
  error: null,
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStatistic.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatistic.fulfilled, (state, action: PayloadAction<ITransaction[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStatistic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default statisticSlice.reducer;
