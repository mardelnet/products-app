import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents the state of the selected product slice.
 */
interface selectedProductSliceState {
  /**
   * Indicates whether the modal is shown or not.
   */
  showModal: boolean;
  /**
   * The ID of the selected product.
   */
  selectedProductId: number;
}

/**
 * The initial state of the selected product slice.
 */
const initialState: selectedProductSliceState = {
  showModal: false,
  selectedProductId: 0
};

/**
 * A slice for managing the selected product state.
 */
export const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    /**
     * Action creator for showing or hiding the modal.
     * @param {boolean} state - The current state.
     * @param {PayloadAction<boolean>} action - The action payload.
     */
    showSelectedProduct: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    /**
     * Action creator for getting the selected product.
     * @param {selectedProductSliceState} state - The current state.
     * @param {PayloadAction<number>} action - The action payload.
     */
    getSelectedProduct: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
  }
});

export const { showSelectedProduct, getSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
