import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "src/Services/blogsServices";

const initialState = {
    blogs: [],
    status: "idle",
    error: null
}

export const fetchBlogs = createAsyncThunk('/blogs/fetchBlogs', async () => {
    const { data } = await getAllBlogs();
    return data;
})

export const addNewBlog = createAsyncThunk('/blogs/addNewBlog', async initialBlog => {
    const { data } = await createBlog(initialBlog);
    return data;
})

export const deleteBlogById = createAsyncThunk('/blogs/deleteBlogById', async initialBlogId => {
    await deleteBlog(initialBlogId);
    return initialBlogId;
})

export const updateBlogById = createAsyncThunk('/blogs/updateBlogById', async initialBlog => {
    const { data } = await updateBlog(initialBlog, initialBlog.id);
    return data;
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
            .addCase(addNewBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload);
            })
            .addCase(deleteBlogById.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
            })
            .addCase(updateBlogById.fulfilled, (state, action) => {
                const { id } = action.payload;
                const updateBlogIndex = state.blogs.findIndex(blog => blog.id === id);
                
                state.blogs[updateBlogIndex] = action.payload;
            })
    }
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state, blogId) => 
    state.blogs.blogs.find(blog => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;