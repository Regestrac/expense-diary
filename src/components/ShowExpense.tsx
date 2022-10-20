import { allExpenses } from 'features/expense/ExpenseSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import './show-expenses.css';
import moment from 'moment';

function ShowExpense() {
  const expenses:{
    item:string;
    date:Date | string;
    cost:number;
    id:string
  }[] = useSelector(allExpenses);
  console.log(expenses);
  return (
    <div className="expenses">
      {expenses.map((expense) => {
        if (expense.item !== '') {
          return (
            <div key={expense.id} className="exp-box">
              <div className="exp-heads">
                <div className="exp-item">{expense?.item}</div>
                <div className="exp-date">{moment(expense?.date).format('L')}</div>
              </div>
              <div className="exp-cost">
                &#8377;
                {' '}
                {expense?.cost}
              </div>
            </div>
          );
        }
        return '';
      })}
    </div>
  );
}

export default ShowExpense;
