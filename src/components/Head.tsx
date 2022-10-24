import { allExpenses } from 'features/expense/ExpenseSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import './Head.css';

function Head() {
  const expenses: {
    item: string;
    date: Date | string;
    cost: number;
    id: string;
    costs: [{ cost: number; }];
  }[] = useSelector(allExpenses);

  const totalExpense = () => {
    let newTotalCost = 0;
    expenses?.map((expense) => {
      let totalCost = 0;
      expense?.costs?.map((cost:{ cost:any }) => {
        totalCost += parseInt(cost.cost, 10);
        return totalCost;
      });
      newTotalCost += totalCost;
      return newTotalCost;
    });
    return newTotalCost;
  };

  return (
    <div className="head">
      <h3 className="title-h3">Expense!</h3>
      <h3 className="total-h3">
        Total:
        <div className="total">
          &#8377;
          {totalExpense() || 0}
        </div>
      </h3>
    </div>
  );
}

export default Head;
