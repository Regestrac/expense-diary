import { allExpenses, deleteExpense } from 'features/expense/ExpenseSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './show-expenses.css';
import moment from 'moment';
import { Button } from 'reactstrap';
import { nanoid } from '@reduxjs/toolkit';

function ShowExpense() {
  const dispatch = useDispatch();

  const expenses: {
    item: string;
    date: Date | string;
    cost: number;
    id: string;
    costs: [{ cost: number }]
  }[] = useSelector(allExpenses);

  const totalExpense = (expense: any) => {
    let totalCost = 0;
    expense?.costs?.map((cost: { cost: string }) => {
      totalCost += parseInt(cost.cost, 10);
      return totalCost;
    });
    return totalCost;
  };

  return (
    <div className="expenses">
      {expenses.map((expense) => {
        if (expense.item !== '') {
          return (
            <div key={expense.id} className="exp-box">
              <div className="exp-heads">
                <div className="exp-item">
                  {expense?.item}
                  :
                </div>
                <div className="exp-date">{moment(expense?.date).format('DD-MM-YYYY').toString()}</div>
              </div>
              <div className="exp-cost">
                <div className="each-cost">
                  {expense?.costs?.map((cost: { cost: number }) => (
                    <p key={nanoid()}>
                      &#8377;
                      {cost.cost}
                    </p>
                  ))}
                </div>
                <hr />
              </div>
              <div className="bottom-row">
                <div className="bottom-total">
                  <h3>
                    &#8377;
                    {totalExpense(expense)}
                  </h3>
                </div>
                <Button className="del-exp" color="danger" onClick={() => { dispatch(deleteExpense({ delId: expense?.id })); }}>
                  <i className="fa-regular fa-trash-can" />
                </Button>
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
