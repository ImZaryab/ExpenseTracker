import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'https://expense-tracker-backend-pi.vercel.app/'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: baseURI
    }),
    endpoints: builder => ({
        //get categories
        getCategories: builder.query({
            query:() => '/api/categories',
            providesTags: ['categories']
        }),

        //get labels
        getLabels: builder.query({
            query:() => '/api/labels',
            providesTags: ['transactions']
        }),

        //add new Transaction
        addTransaction: builder.mutation({
            query:(transactionData) => ({
                url: '/api/transactions',
                method: 'POST',
                body:transactionData
            }),
            invalidatesTags: ['transactions']
        }),

        //delete transaction
        deleteTransaction: builder.mutation({
            query:(transactionID) => ({
                url: '/api/transactions',
                method: 'DELETE',
                body:transactionID
            }),
            invalidatesTags: ['transactions']
        })
    })
})

export default apiSlice;