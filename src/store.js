import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './utils/selectedProductSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})