import React from 'react';
import './Head.css';

const Head = ({ total }:{ total:number }) => (
  <div className="head">
    <h3 className="title-h3">Expense!</h3>
    <h3 className="total-h3">
      Total:
      <div className="total">
        &#8377;
        {total}
      </div>
    </h3>
  </div>
);

export default Head;
