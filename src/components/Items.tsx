/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import {
  Controller, useFieldArray, useForm, useWatch,
} from 'react-hook-form';
import { Button, Form, Input } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nanoid } from '@reduxjs/toolkit';
import Head from './Head';
import './items.css';

const schema = yup.object().shape({
  expenses: yup.array().of(
    yup.object().shape({
      date: yup.date(),
      item: yup.string().required('Item required!'),
      cost: yup.number(),
    }),
  ),
});

function Items() {
  const [total, setTotal] = useState(0);
  //   type FormValues = {
  //     expenses: {
  //       date: Date | string;
  //       item: string;
  //       cost: number;
  //       id: string;
  //     }[]
  //   };

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenses',
  });

  const appendItems = () => {
    append({
      date: new Date(),
      item: '',
      cost: 0,
      id: nanoid(),
    });
  };

  const addCostBox = () => {
  };

  const Total = () => {
    const formValues = useWatch({
      name: 'expenses',
      control,
    });
    const total = formValues.reduce(
      (acc:any, current:any) => (parseInt(acc, 10) + parseInt(current.cost, 10)),
      0,
    );
    setTotal(total);
    return total;
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <Head total={total} />
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="item-list">
            <div className="headings">
              <div className="item1">Sl. No.</div>
              <div className="item-body-heading">
                <div className="item2">Date</div>
                <div className="item3">Item</div>
                <div className="item4">Expenses</div>
              </div>
              <div className="item5">Total</div>
              <div className="item6" />
            </div>
            <div>
              {fields.map((item, index) => (
                <div key={item.id} className="new-items">
                  <div className="item1">{index + 1}</div>
                  <div className="item-body">
                    <div className="item2">
                      <Controller control={control} name={`expenses[${index}].date`} render={({ field }) => <Input type="date" {...field} />} />
                    </div>
                    <div className="item3">
                      <Controller control={control} name={`expenses[${index}].item`} render={({ field }) => <Input type="text" placeholder="Add Item..." {...field} />} />
                      {/* <small className="warn">{errors?.expenses?.[0]?.item?.message}</small> */}
                    </div>
                    <div className="add-item item4">
                      &#8377;
                      {' '}
                      <Controller control={control} name={`expenses[${index}].cost`} render={({ field }) => <Input type="number" placeholder="00" {...field} />} />
                      <Button onClick={addCostBox} color="success"><i className="fa-solid fa-plus" /></Button>
                    </div>
                  </div>
                  <div className="item5">
                    <h5>
                      &#8377;
                      {<Total /> || 0}
                    </h5>
                  </div>
                  <div className="item6"><Button onClick={() => remove(index)} color="danger"><i className="fa-regular fa-trash-can" /></Button></div>
                </div>
              ))}
              <Button color="success" className="sub-btn">
                <Input className="sub-inp" type="submit" />
                Save
              </Button>
            </div>
          </div>
        </Form>
        <Button className="new-btn" onClick={appendItems} color="primary">
          <i className="fa-solid fa-plus" />
          New Item
        </Button>
      </div>
    </div>
  );
}

export default Items;
