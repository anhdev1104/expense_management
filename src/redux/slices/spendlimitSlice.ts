import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISpendlimit } from '@/types/spendlimit.type';
import { getSpendlimit, deleteSpendlimit } from '@/services/spendlimitService';

interface ISpendlimitData {
  data: ISpendlimit[];
  loading: boolean;
  error: string | undefined | null;
  isModal: boolean;
}

export const getSpendlimitData = createAsyncThunk('data/getSpendlimitData', async (id: string = '', thunkAPI) => {
  try {
    const data = await getSpendlimit(id);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteSpendlimitData = createAsyncThunk('data/deleteSpendlimitData', async (id: string, thunkAPI) => {
  try {
    await deleteSpendlimit(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: ISpendlimitData = {
  data: [],
  loading: false,
  error: null,
  isModal: false,
};

const spendlimitSlice = createSlice({
  name: 'spendlimit',
  initialState,
  reducers: {
    toggleModal: state => {
      state.isModal = !state.isModal;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSpendlimitData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpendlimitData.fulfilled, (state, action: PayloadAction<ISpendlimit[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSpendlimitData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSpendlimitData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSpendlimitData.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.data = state.data.filter(item => item._id !== action.payload);
      })
      .addCase(deleteSpendlimitData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleModal } = spendlimitSlice.actions;
export default spendlimitSlice.reducer;
