import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface selectedProductSliceState {
  showModal: boolean;
  selectedProductId: number
}

const initialState: selectedProductSliceState = {
  showModal: false,
  selectedProductId: 0
};

export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    showSelectedProduct: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    getSelectedProduct: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
  }
});

export const { showSelectedProduct, getSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
