import { createSlice } from '@reduxjs/toolkit';

type State= {
  expenses:{expenseData:[{
    id:string;
    date:Date;
    item:string;
    cost:number;
  }]
}
}

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
  reducer: {
    addExpense(state:any, action:any) {
      state.expenseData.push(action.payload);
    },
    deleteExpense(state:any, action:any) {
      state.expenseData = state.expenses.filter((states:any) => states.id !== action.payload.delId);
    },
    changeExpense(state:any, action:any) {
      state.expenseData = state.expenses.map((states:any) => (
        states.id === action.payload.changeId ? {
            ...states,
            date: action.payload.newDate,
            item: action.paylload.newItem,
            cost: action.payload.newCost,
          }
          : states;));
    },
  },
});

export const {addExpense,deleteExpense,changeExpense} = ExpenseSlice.actions;
export const allExpenses = (state: State) => state.expenses.expenseData;
export default ExpenseSlice.reducer;
