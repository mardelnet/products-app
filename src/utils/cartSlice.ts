import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
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
      // Find if the product already exists in the cart
      const existingProductIndex = state.productsInCart.findIndex(product => product.id === action.payload.id);
      if (existingProductIndex !== -1) {
        // If the product already exists, increase its quantity by 1
        state.productsInCart[existingProductIndex].quantity = (state.productsInCart[existingProductIndex].quantity || 1) + 1;
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        state.productsInCart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      // Find the index of the product to remove
      const indexToRemove = state.productsInCart.findIndex(product => product.id === action.payload);
      if (indexToRemove !== -1) {
        // If the product is found, remove it from the cart
        state.productsInCart.splice(indexToRemove, 1);
      }
    },
  },
});


export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;
