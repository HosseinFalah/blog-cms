import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "src/Api/apiSlice";
import blogsReducer from "src/Features/blog/blogSlice";
import usersReducer, { fetchUsers } from "src/Features/blog/userSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

// Fetch All Users from api
store.dispatch(fetchUsers());