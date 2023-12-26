import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", //state.api
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    endpoints: builder => ({
        getBlog: builder.query({
            query: () => '/blogs'
        })
    })
});

export const { useGetBlogQuery } = apiSlice;