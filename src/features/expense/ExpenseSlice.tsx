import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

type State = {
  id:string;
  expenses:{ expenseData:[{
    id:string;
    date:Date | string;
    item:string;
    cost:number;
  }]
  }
};
type Payload = {
  payload:{
    id:string;
    date:string;
    item:string;
    cost:number;
  }
};

const initialState = {
  expenseData: [{
    id: '',
    date: moment().format('L'),
    item: '',
    cost: 0,
  }],
};

const parsedData = () => {
  let ParsedExpArray;
  if (localStorage.getItem('Expenses') !== null) {
    const expArray:any = localStorage.getItem('Expenses');
    ParsedExpArray = JSON.parse(expArray);
  }
  return ParsedExpArray;
};

const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action:Payload) {
      state.expenseData.push(action.payload);
      if (localStorage.getItem('Expenses') !== null) {
        const expArr:any = localStorage.getItem('Expenses');
        const parsedArr = JSON.parse(expArr);
        const newArray = [...parsedArr, action.payload];
        localStorage.setItem('Expenses', JSON.stringify(newArray));
      } else {
        const jsonObject = JSON.stringify([action.payload]);
        localStorage.setItem('Expenses', jsonObject);
      }
    },
    deleteExpense(state, action:{ payload:{ delId:string } }) {
      state.expenseData = state.expenseData.filter(
        (states) => states.id !== action.payload.delId,
      );
      if (localStorage.getItem('Expenses') !== null) {
        const expArr:any = localStorage.getItem('Expenses');
        const parsedArr = JSON.parse(expArr);
        const newArray = parsedArr.filter((s:{ id:string }) => s.id !== action.payload.delId);
        localStorage.setItem('Expenses', JSON.stringify(newArray));
      }
    },
    changeExpense(state:any, action:{ payload:{
      changeId:string;
      newDate: Date | string;
      newItem:string;
      newCost:number;
    } }) {
      state.expenseData = state.expenseData.map((states:State) => (
        states.id === action.payload.changeId ? {
          ...states,
          date: action.payload.newDate,
          item: action.payload.newItem,
          cost: action.payload.newCost,
        }
          : states));
      // if (localStorage.getItem('Expenses') !== null) {
      //   const expArr:any = localStorage.getItem('Expenses');
      //   const parsedArr = JSON.parse(expArr);
      //   const newArray = [...parsedArr, state.expenseData];
      //   localStorage.setItem('Expenses', JSON.stringify(newArray));
      // }
    },
  },
});

export const { addExpense, deleteExpense, changeExpense } = ExpenseSlice.actions;
export const allExpenses = (state: State) => parsedData() || state.expenses.expenseData;
export default ExpenseSlice.reducer;
