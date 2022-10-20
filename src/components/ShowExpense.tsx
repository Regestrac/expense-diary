import { allExpenses, deleteExpense } from 'features/expense/ExpenseSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './show-expenses.css';
import moment from 'moment';
import { Button } from 'reactstrap';

function ShowExpense() {
  const dispatch = useDispatch();
  const expenses:{
    item:string;
    date:Date | string;
    cost:number;
    id:string
  }[] = useSelector(allExpenses);
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
              <Button className="del-exp" color="danger" onClick={() => { dispatch(deleteExpense({ delId: expense?.id })); }}><i className="fa-regular fa-trash-can" /></Button>
            </div>
          );
        }
        return '';
      })}
    </div>
  );
}

export default ShowExpense;
