import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

type State = {
  id: string;
  expenses: {
    expenseData: [{
      id: string;
      date: Date | string;
      item: string;
      costs: [{ cost: number | string }]
    }]
  }
};

type Payload = {
  payload: {
    id: string;
    date: string;
    item: string;
    costs: [{ cost: string }]
  }
};

const initialState = {
  expenseData: [{
    id: '',
    date: moment().format('DD/MM/yyyy'),
    item: '',
    costs: [{ cost: '' }],
  }],
};

const parsedData = () => {
  let ParsedExpArray;
  if (localStorage.getItem('Expenses') !== null) {
    const expArray = localStorage.getItem('Expenses') || '';
    ParsedExpArray = JSON.parse(expArray);
  }
  return ParsedExpArray;
};

const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action: Payload) {
      state.expenseData.push(action.payload);
      if (localStorage.getItem('Expenses') !== null) {
        const expArr = localStorage.getItem('Expenses') || '';
        const parsedArr = JSON.parse(expArr);
        const newArray = [...parsedArr, action.payload];
        localStorage.setItem('Expenses', JSON.stringify(newArray));
      } else {
        const jsonObject = JSON.stringify([action.payload]);
        localStorage.setItem('Expenses', jsonObject);
      }
    },
    deleteExpense(state, action: { payload: { delId: string } }) {
      state.expenseData = state.expenseData.filter(
        (states) => states.id !== action.payload.delId,
      );
      if (localStorage.getItem('Expenses') !== null) {
        const expArr = localStorage.getItem('Expenses') || '';
        const parsedArr = JSON.parse(expArr);
        const newArray = parsedArr.filter((s: { id: string }) => s.id !== action.payload.delId);
        localStorage.setItem('Expenses', JSON.stringify(newArray));
      }
    },
    changeExpense(state: any, action: {
      payload: {
        changeId: string;
        newDate: Date | string;
        newItem: string;
        newCosts: [{ cost: number; }];
      }
    }) {
      state.expenseData = state.expenseData.map((states: State) => (
        states.id === action.payload.changeId ? {
          ...states,
          date: action.payload.newDate,
          item: action.payload.newItem,
          costs: action.payload.newCosts,
        }
          : states));
      if (localStorage.getItem('Expenses') !== null) {
        const expArr = localStorage.getItem('Expenses') || '';
        const parsedArr = JSON.parse(expArr);
        const newArray = parsedArr.map((arrItem: State) => (
          arrItem.id === action.payload.changeId ? {
            ...arrItem,
            date: action.payload.newDate,
            item: action.payload.newItem,
            costs: action.payload.newCosts,
          }
            : arrItem
        ));
        localStorage.setItem('Expenses', JSON.stringify(newArray));
      }
    },
  },
});

export const { addExpense, deleteExpense, changeExpense } = ExpenseSlice.actions;
export const allExpenses = (state: State) => parsedData() || state.expenses.expenseData;
export default ExpenseSlice.reducer;
