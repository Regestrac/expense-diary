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
      item: yup.string().required('Item is required'),
      costs: yup.array().of(
        yup.object().shape({
          cost: yup.number().required('Required').typeError('Enter a valid number or delete the field!').min(1, 'Expense should be minimum 1!'),
        }),
      ),
    }),
  ),
});

function Items() {
  const dispatch = useDispatch();
  const [delBtn, setDelBtn] = useState(false);
  const [totalCostsCost, setTotalCostsCost] = useState(0);

  const { control, handleSubmit, formState: { errors } }: {
    control: any, handleSubmit: any, reset: any, formState: { errors: any, },
  } = useForm({
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

  useMemo(() => {
    if (fields.length < 1) {
      append({
        date: moment().format('yyyy-MM-DD').toString(),
        item: '',
        costs: [{ cost: '' }],
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
      date: moment().format('yyyy-MM-DD').toString(),
      item: '',
      costs: [{ cost: '' }],
      id: nanoid(),
    });
  };

  const totalCostValue = (idx: number) => {
    let totalCost = 0;
    formValues?.[idx]?.costs?.map((cost: { cost: string }) => {
      const Cost = cost?.cost?.toString();
      totalCost += parseInt(Cost, 10) || 0;
      return totalCost;
    });
    return totalCost;
  };

  let totalCost = 0;
  formValues?.map((values: { costs: [{ cost: number }] }) => {
    values?.costs.map((cost: { cost: number }) => {
      totalCost += parseInt(cost?.cost?.toString(), 10) || 0;
      return totalCost;
    });
    return totalCost;
  });

  useEffect(() => {
    setTotalCostsCost(totalCost);
  }, [formValues]);

  const onSubmit = (data: any) => {
    for (let i = 0; i < data.expenses.length; i += 1) {
      dispatch(addExpense({
        id: data.expenses[i].id,
        date: moment(data.expenses[i].date).format('yyyy-MM-DD').toString(),
        item: data.expenses[i].item,
        costs: data.expenses[i].costs,
      }));
    }
    remove();
  };

  return (
    <div>
      <Head />
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
              {fields.map((items, index) => (
                <div key={items.id} className="new-items">
                  <div className="item1">{index + 1}</div>
                  <div className="item-body">
                    <div className="item2">
                      <Controller control={control} name={`expenses[${index}].date`} render={({ field }) => <Input type="date" {...field} />} />
                    </div>
                    <div className="item3">
                      <Controller control={control} name={`expenses[${index}].item`} render={({ field }) => <Input type="text" placeholder="Add Item..." {...field} />} />
                      <small className="warn">{errors?.expenses?.[index]?.item?.message}</small>
                    </div>
                    <div className="item4">
                      <CostCtrl
                        index={index}
                        control={control}
                        error={errors?.expenses?.[index]?.costs}
                      />
                    </div>
                  </div>
                  <div className="item5">
                    <h5>
                      &#8377;
                      {totalCostValue(index)}
                    </h5>
                  </div>
                  <div className="item6">
                    {delBtn && <Button className="del-row" onClick={() => remove(index)} color="danger"><i className="fa-regular fa-trash-can" /></Button>}
                  </div>
                </div>
              ))}
              <hr />
              <div className="total-expense">
                Total:
                {' '}
                &#8377;
                {' '}
                {totalCostsCost || 0}
              </div>
              <Button className="new-btn" onClick={appendItems} color="primary">
                <i className="fa-solid fa-plus" />
                {' '}
                New Item
              </Button>
              <Button color="success" className="sub-btn">
                <Input className="sub-inp" type="submit" />
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <ShowExpense />
    </div>
  );
}

export default Items;
