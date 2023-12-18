import { createSlice, nanoid } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content) {
                // Complex Logix
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
        },
        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;

            const existingBlog = state.find(blog => blog.id === id);

            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        }
    }
})

export const { blogAdded, blogUpdated } = blogsSlice.actions;

export default blogsSlice.reducer;