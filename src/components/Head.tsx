import { allExpenses } from 'features/expense/ExpenseSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import './Head.css';

function Head() {
  const expenses: {
    item: string;
    date: Date | string;
    cost: number;
    id: string
  }[] = useSelector(allExpenses);

  const total = () => {
    let totalCost = 0;
    expenses.map((data) => {
      totalCost += parseInt(data.cost.toString(), 10);
      return totalCost;
    });
    return totalCost;
  };

  return (
    <div className="head">
      <h3 className="title-h3">Expense!</h3>
      <h3 className="total-h3">
        Total:
        <div className="total">
          &#8377;
          {total() || 0}
        </div>
      </h3>
    </div>
  );
}

export default Head;
