import React from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { Button, Input } from 'reactstrap';
import './cost-ctrl.css';

function CostCtrl({ index, control, ids }:{ index:number;control:any;ids:string }) {
  const { fields, append } = useFieldArray({
    name: 'expenses.costs',
    control,
  });
  if (fields.length < 1) {
    append({
      cost: 0,
    });
  }
  console.log('fields: ', fields);

  const appendCtrl = (btnId:string) => {
    console.log('btnId: ', btnId);
    fields.map(() => {
      if (btnId) {
        append({
          cost: 0,
        });
      }
      return '';
    });
  };
  return (
    <div className="add-item">
      &#8377;
      {' '}
      <div className="cost-input">
        {fields.map((fieldItem, idx) => (
          <div key={fieldItem.id} className="inp-ctrl">
            <Controller control={control} name={`expenses[${index}].costs[${idx}].cost`} render={({ field }) => <Input type="number" placeholder="00" {...field} />} />
          </div>
        ))}
      </div>
      <Button onClick={() => appendCtrl(ids)} color="success">
        <i className="fa-solid fa-plus" />
      </Button>
    </div>
  );
}

export default CostCtrl;
