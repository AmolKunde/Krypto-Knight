import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url) => ({ url,headers: {Accept: 'application/json'}});

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://v6.exchangerate-api.com' }),
    endpoints: (builder) => ({
    getValue: builder.query({
      //query: () => createRequest(`/v6/${process.env.EXCHANGE_API_KEY}/pair/USD/INR`),
      query: () => createRequest(`/v6/a67f0a350c5b028c783d9817/pair/USD/INR`),
    }),
    
  }),
});

export const {useGetValueQuery} = exchangeApi;