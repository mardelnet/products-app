import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity?: number;
}

interface selectedProductSliceState {
  productsInCart: Product[];
}

const initialState: selectedProductSliceState = {
  productsInCart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.productsInCart.findIndex(product => product.id === action.payload.id);
      if (existingProductIndex !== -1) {
        // Product already exists in the cart, increase its quantity by 1
        state.productsInCart[existingProductIndex].quantity = (state.productsInCart[existingProductIndex].quantity || 1) + 1;
      } else {
        // Product doesn't exist in the cart, add it with quantity 1
        state.productsInCart.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});


export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
