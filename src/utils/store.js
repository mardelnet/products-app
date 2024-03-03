import { configureStore } from '@reduxjs/toolkit'
import chosenProductReducer from './selectedProductSlice'

export default configureStore({
  reducer: {
    chosenProduct: chosenProductReducer
  }
})