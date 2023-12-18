import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "src/Features/blog/blogSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer
    }
});