import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
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
    reducers: {},
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
    
export const selectUserBlogs = createSelector(
    [selectAllBlogs, (_, userId) => userId],
    (blogs, userId) => blogs.filter(blog => blog.user === userId)
)

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;