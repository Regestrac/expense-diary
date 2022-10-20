import { createSlice } from '@reduxjs/toolkit';

type State = {
  id:string;
  expenses:{ expenseData:[{
    id:string;
    date:Date;
    item:string;
    cost:number;
  }]
  }
};
type Payload = {
  payload:{
    id:string;
    date:Date;
    item:string;
    cost:number;
  }
};

const initialState = {
  expenseData: [{
    id: '',
    date: new Date(),
    item: '',
    cost: 0,
  }],
};

const ExpenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action:Payload) {
      state.expenseData.push(action.payload);
    },
    deleteExpense(state, action:{ payload:{ delId:string } }) {
      state.expenseData = state.expenseData.filter(
        (states) => states.id !== action.payload.delId,
      );
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
    },
  },
});

export const { addExpense, deleteExpense, changeExpense } = ExpenseSlice.actions;
export const allExpenses = (state: State) => state.expenses.expenseData;
export default ExpenseSlice.reducer;
