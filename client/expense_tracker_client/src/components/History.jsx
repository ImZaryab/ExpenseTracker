import React from "react";
import "boxicons";
import {default as api} from '../store/apiSlice'

export default function History() {

    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
    const [deleteTransaction] = api.useDeleteTransactionMutation();

    function handleDelete(e) {
        // fetch("http://localhost:8080/api/transaction", {
        //   method: "DELETE",
        //   body: JSON.stringify({ _id: id }),
        // });
        // console.log(e.currentTarget.getAttribute("data-value"))

        if(!e.target.dataset.id) return 0
        deleteTransaction({ _id:e.target.dataset.id })
      }

    let Transactions;

    if(isFetching){
        Transactions = <div>Fetching</div>
    }else if(isSuccess){
        Transactions = data.map((item, index) => <Transaction key={index} category={item} handler={handleDelete}></Transaction>);
    }else if(isError){
        Transactions = <div>Error</div>
    }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl text-white">History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) {
    return null;
  }
  return (
    <>
      <div
        className="item flex justify-center items-center bg-gray-50 py-2 rounded-r"
        style={{ borderRight: `8px solid ${category.color ?? "#46C2CB"}` }}
      >
        <button className="px-3 pt-2" onClick={handler}>
          <box-icon name="trash" size="20px" color={"#fe3e3e"} data-id={category._id ?? ''}></box-icon>
        </button>
        <span className="block w-full text-left pl-2">
          {category.name ?? ""}
        </span>
      </div>
    </>
  );
}
