import React from "react";
import { useForm } from "react-hook-form";
import History from "./History";
import {default as api} from '../store/apiSlice'

export default function Form() {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation()

  const onSubmit = async(data) => {
    if(!data){
      return <></>
    }
    await addTransaction(data).unwrap()
    resetField("name");
    resetField("amount");
  };

  return (
    <div className="form max-w-sm mx-auto w-96">
      <h1 className="font-bold pb-4 text-xl text-white">Transaction</h1>

      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              required
              type="text"
              placeholder="Salary, House Rent, Income, Bills"
              className="form-input"
              {...register("name")}
            />
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Expense" defaultValue>Expense</option>
            <option value="Investment">Investment</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="number"
              placeholder="Amount"
              className="form-input"
              {...register("amount")}
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-primary w-full">
              Make Transaction
            </button>
          </div>
        </div>
      </form>

      <History />
    </div>
  );
}
