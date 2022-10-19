import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Form, Input } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nanoid } from '@reduxjs/toolkit';
import Head from './Head';

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
          <div>
            <div>
              <div>Sl. No.</div>
              <div>Date</div>
              <div>Item</div>
              <div>Expenses</div>
              <div>Total</div>
            </div>
            <div>
              {fields.map((item, index) => (
                <div key={item.id}>
                  <div>{index + 1}</div>
                  <div>
                    <Controller control={control} name="date" render={({ field }) => <Input type="date" {...field} />} />
                  </div>
                  <div>
                    <Controller control={control} name="item" render={({ field }) => <Input placeholder="Add Item..." {...field} />} />
                    {/* <small className="warn">{errors?.expenses?.[]?.item?.message}</small> */}
                  </div>
                  <div>
                    &#8377;
                    <Controller control={control} name="cost" render={({ field }) => <Input placeholder="00" {...field} />} />
                    <Button color="success"><i className="fa-solid fa-plus" /></Button>
                  </div>
                  <div><h4>Rs. 1000</h4></div>
                </div>
              ))}
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </Form>
        <Button onClick={appendItems} color="primary">
          <i className="fa-solid fa-plus" />
          New Item
        </Button>
      </div>
    </div>
  );
}

export default Items;
