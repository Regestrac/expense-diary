import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { Button, Input } from 'reactstrap';
import './cost-ctrl.css';

function CostCtrl({ index, control, ids }:{ index:number;control:any;ids:string; }) {
  const [showBtn, setShowBtn] = useState(true);
  const [showDelBtn, setShowDelBtn] = useState(false);
  const { fields, append, remove } = useFieldArray({
    name: 'expenses.costs',
    control,
  });
  if (fields.length < 1) {
    append({
      cost: 0,
    });
  }
  useEffect(() => {
    if (fields.length > 4) {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
    if (fields.length > 1) {
      setShowDelBtn(true);
    } else {
      setShowDelBtn(false);
    }
  }, [fields]);

  const appendCtrl = () => {
    if (ids) {
      append({
        cost: 0,
      });
    }
  };

  const removeCtrl = (idx:number) => {
    remove(idx);
  };
  return (
    <div className="add-item">
      &#8377;
      {' '}
      <div className="cost-input">
        {fields.map((fieldItem, idx) => (
          <div key={fieldItem.id} className="inp-ctrl">
            <Controller control={control} name={`expenses[${index}].costs[${idx}].cost`} render={({ field }) => <Input type="number" placeholder="00" {...field} />} />
            {showDelBtn
        && <Button color="danger" onClick={() => removeCtrl(idx)}><i className="fa-solid fa-minus" /></Button>}
          </div>
        ))}
      </div>
      {showBtn && (
      <Button onClick={appendCtrl} color="success">
        <i className="fa-solid fa-plus" />
      </Button>
      )}
    </div>
  );
}

export default CostCtrl;
