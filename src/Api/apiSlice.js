import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", //state.api
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => '/blogs'
        }),
        getBlog: builder.query({
            query: (initialBlogId) => `/blogs/${initialBlogId}`
        }),
        addNewBlog: builder.mutation({
            query: initialBlog => ({ url: "/blogs", method: "POST", body: initialBlog })
        })
    })
});

export const { useGetBlogsQuery, useGetBlogQuery, useAddNewBlogMutation } = apiSlice;