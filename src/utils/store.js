import { configureStore } from '@reduxjs/toolkit'
import selectedProductReducer from './selectedProductSlice'
import cartReducer from './cartSlice'

export default configureStore({
  reducer: {
    chosenProduct: selectedProductReducer,
    cart: cartReducer
  }
})