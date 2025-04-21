import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../types/productTypes";
import { apiBaseQuery } from "@/src/api/apiBase";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getAllProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
  }),
});

export const { useGetProductByIdQuery, useGetAllProductsQuery } = productsApi;
