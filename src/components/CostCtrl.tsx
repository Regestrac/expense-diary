import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { Button, Input } from 'reactstrap';
import './cost-ctrl.css';

function CostCtrl({ index, control, error }: {
  index: number; control: any; error: [{ cost: { message: string } }]
}) {
  const [showBtn, setShowBtn] = useState(true);
  const [showDelBtn, setShowDelBtn] = useState(false);

  const { fields, append, remove } = useFieldArray({
    name: `expenses[${index}].costs`,
    control,
  });

  if (fields.length < 1) {
    append({
      cost: '',
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
    append({
      cost: '',
    });
  };

  const removeCtrl = (idx: number) => {
    remove(idx);
  };

  return (
    <div className="add-item">
      <div className="cost-input">
        {fields.map((fieldItem, idx) => (
          <div key={fieldItem.id}>
            <div className="inp-ctrl">
              &#8377;
              {' '}
              <Controller
                control={control}
                name={`expenses[${index}].costs[${idx}].cost`}
                render={({ field }: { field: any }) => <Input type="number" placeholder="00" {...field} />}
              />
              {showDelBtn
                && <Button color="danger" onClick={() => removeCtrl(idx)}><i className="fa-solid fa-minus" /></Button>}
            </div>
            <small className="warn">{error?.[idx]?.cost?.message}</small>
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
