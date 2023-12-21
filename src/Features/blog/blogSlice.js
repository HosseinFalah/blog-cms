import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllBlogs } from "src/Services/blogsServices";

const initialState = {
    blogs: [],
    status: "idle",
    error: null
}

export const fetchBlogs = createAsyncThunk('/blogs/fetchBlogs', async () => {
    const response = await getAllBlogs();
    return response.data;
})

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.blogs.push(action.payload)
            },
            prepare(title, content, userId) {
                // Complex Logix
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;

            const existingBlog = state.blogs.find(blog => blog.id === id);

            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        },
        blogDeleted: (state, action) => {
            const { id } = action.payload;
            state.blogs = state.blogs.filter(blog => blog.id !== id);
        },
        reactionAdded: (state, action) => {
            const { blogId, reaction } = action.payload;
            const existingBlog = state.blogs.find(blog => blog.id === blogId);
            
            if (existingBlog) {
                existingBlog.reactions[reaction]++;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlogs.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "completed";
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state, blogId) => 
    state.blogs.blogs.find(blog => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;