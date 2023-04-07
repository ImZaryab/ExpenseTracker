import React from 'react'
import {default as api} from '../store/apiSlice'
import { getLabelsPercentage } from '../helper/helper';

export default function Labels() {

    const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery()

    let Transactions;
    if(isFetching){
        Transactions = <></>
    }else if(isSuccess){
        Transactions = getLabelsPercentage(data, 'type').map((item, index) => <LabelComponent key={index} data={item}></LabelComponent>)
    }else if(isError){
        Transactions = <div>Error</div>
    }

  return (
    <>
        {Transactions}
    </>
  )
}

function LabelComponent({ data }){
    if(!data) return <></>;
    return (
        <>
            <div className='text-white labels flex justify-between'>
                <div className='flex gap-2'>
                    <div className='w-2 h-2 rounded py-3' style={{backgroundColor: data.color ?? '#a0f03e'}}></div>
                    <h3 className='text-md'>{data.type ?? ""}</h3>
                </div>
                <h3 className='font-bold'>{Math.round(data.percentage) ?? 0}%</h3>
            </div>
        </>
    )
}