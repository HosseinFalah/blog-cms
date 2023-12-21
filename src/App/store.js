import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "src/Features/blog/blogSlice";
import usersReducer, { fetchUsers } from "src/Features/blog/userSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer
    }
});

// Fetch All Users from api
store.dispatch(fetchUsers());