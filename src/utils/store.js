import { configureStore } from '@reduxjs/toolkit'
import selectedProductReducer from './selectedProductSlice'
import cartReducer from './cartSlice'

/**
 * Configures the Redux store with the provided reducers.
 * @returns {Store} The configured Redux store.
 */
export default configureStore({
  reducer: {
    /**
     * Reducer for managing the state related to selected products.
     */
    chosenProduct: selectedProductReducer,
    /**
     * Reducer for managing the state related to the shopping cart.
     */
    cart: cartReducer
  }
})
