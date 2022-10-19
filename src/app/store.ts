import { configureStore } from '@reduxjs/toolkit';
import ExpenseSlice from '../features/expense/ExpenseSlice';

const store = configureStore({
  reducer: {
    counter: ExpenseSlice,
  },
});

export default store;
