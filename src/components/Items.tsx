import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
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
  // type FormValues = {
  //   expenses: {
  //     date: Date | string;
  //     item: string;
  //     expense: number;
  //     id: string;
  //   }[]
  // };

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'expenses',
  });

  const appendItems = () => {
    append({
      date: '',
      item: '',
      expense: 0,
      id: nanoid(),
    });
  };

  const onSubmit = (data: any) => {
    console.log(data);
    console.log(errors);
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
            </div>
            <div>
              {fields.map((item, index) => (
                <div key={item.id} className="new-items">
                  <div className="item1">{index + 1}</div>
                  <div className="item-body">
                    <div className="item2">
                      <Controller control={control} name="date" render={({ field }) => <Input type="date" {...field} />} />
                    </div>
                    <div className="item3">
                      <Controller control={control} name="item" render={({ field }) => <Input type="text" placeholder="Add Item..." {...field} />} />
                      {/* <small className="warn">{errors?.expenses?.[]?.item?.message}</small> */}
                    </div>
                    <div className="add-item item4">
                      &#8377;
                      <Controller control={control} name="cost" render={({ field }) => <Input type="number" placeholder="00" {...field} />} />
                      <Button color="success"><i className="fa-solid fa-plus" /></Button>
                    </div>
                  </div>
                  <div className="item5"><h4>Rs. 1000</h4></div>
                </div>
              ))}
              <Button className="sub-btn">
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
