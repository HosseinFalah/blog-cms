import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "src/Features/blog/blogSlice";
import usersReducer from "src/Features/blog/userSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer
    }
});