import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataSlice } from '../slices/data';

const reducer = combineReducers({
  data: dataSlice.reducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
