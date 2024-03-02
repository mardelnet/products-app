import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: boolean;
}

const initialState: CounterState = {
  value: false
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveProductId: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { saveProductId } = counterSlice.actions;

export default counterSlice.reducer;
