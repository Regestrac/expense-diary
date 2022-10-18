import { configureStore } from '@reduxjs/toolkit';
import ExpenseSlice from '../features/expense/ExpenseSlice';

export const store = configureStore({
  reducer: {
    counter: ExpenseSlice,
  },
});

