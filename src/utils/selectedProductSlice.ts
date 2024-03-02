import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface selectedProductSliceState {
  showModal: boolean;
}

const initialState: selectedProductSliceState = {
  showModal: false
};

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    showSelectedProduct: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  }
});

export const { showSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
