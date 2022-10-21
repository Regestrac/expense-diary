/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Controller, useFieldArray, useForm, useWatch,
} from 'react-hook-form';
import { Button, Form, Input } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addExpense } from 'features/expense/ExpenseSlice';
import moment from 'moment';

import Head from './Head';
import './items.css';
import ShowExpense from './ShowExpense';
import CostCtrl from './CostCtrl';

const schema = yup.object().shape({
  expenses: yup.array().of(
    yup.object().shape({
      date: yup.date().optional(),
      item: yup.string().required('Item required!'),
      costs: yup.array().of(
        yup.object().shape({
          cost: yup.number().typeError('Please Enter numbere only!'),
        }),
      ),
    }),
  ),
});

function Items() {
  // type FormValues = {
  //   expenses:{
  //     id:string;
  //     date: Date | string;
  //     item: string;
  //     cost:number
  //   }
  // };

  // const [value, setValue] = useState(0);
  const [delBtn, setDelBtn] = useState(false);
  const dispatch = useDispatch();

  const {
    control, handleSubmit, reset, formState: { errors },
  }:{ control:any;handleSubmit:any; reset:any; formState:{ errors:any } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenses',
  });

  const formValues = useWatch({
    name: 'expenses',
    control,
  });
  console.log('formValues: ', formValues);

  const totalCostValue = (idx:number) => {
    let totalCost = 0;
    formValues?.[idx]?.costs?.map((cost:any) => {
      const Cost = cost.cost;
      totalCost += parseInt(Cost || 0, 10);
      return totalCost;
    });
    return totalCost;
  };

  // useEffect(() => {
  //   setValue(formValues || 0);
  // }, [formValues]);

  useMemo(() => {
    if (fields.length < 1) {
      append({
        date: moment().format('L').toString(),
        item: '',
        costs: [{ cost: 0 }],
        id: nanoid(),
      });
    } else if (fields.length < 2) {
      setDelBtn(false);
    } else {
      setDelBtn(true);
    }
  }, [fields]);

  const appendItems = () => {
    append({
      date: moment().format('L').toString(),
      item: '',
      costs: [{ cost: 0 }],
      id: nanoid(),
    });
  };

  const total = () => {
    const totalCost = formValues?.reduce(
      (acc: any, current: any) => (parseInt(acc || 0, 10)
      + parseInt(current.costs[0].cost || 0, 10)),
      0,
    );
    return totalCost;
  };

  const onSubmit = (data: any) => {
    console.log('data: ', data);
    for (let i = 0; i < data.expenses.length; i += 1) {
      dispatch(addExpense({
        id: data.expenses[i].id,
        date: moment(data.expenses[i].date).format('L').toString(),
        item: data.expenses[i].item,
        cost: data.expenses[i].cost,
      }));
    }
    reset();
    remove();
  };

  return (
    <div>
      <Head total={total()} />
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
                      <small className="warn">{ errors?.expenses?.[index]?.item?.message }</small>
                    </div>
                    <div className="item4">
                      <CostCtrl index={index} control={control} ids={item.id} />
                      <div>
                        <small className="warn">{ errors?.expenses?.[index]?.cost?.message }</small>
                      </div>
                    </div>
                  </div>
                  <div className="item5">
                    <h5>
                      &#8377;
                      {totalCostValue(index)}
                    </h5>
                  </div>
                  <div className="item6">
                    {delBtn && <Button onClick={() => remove(index)} color="danger"><i className="fa-regular fa-trash-can" /></Button>}
                  </div>
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
      <ShowExpense />
    </div>
  );
}

export default Items;
