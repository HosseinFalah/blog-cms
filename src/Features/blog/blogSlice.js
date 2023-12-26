import { createAsyncThunk, createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "src/Services/blogsServices";

const blogAdaptor = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.data)
});

const initialState = blogAdaptor.getInitialState({
    status: 'idle',
    error: null
});

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
        reactionAdded: (state, action) => {
            const { blogId, reaction } = action.payload;
            const existingBlog = state.entities[blogId];

            if (existingBlog) {
                existingBlog.reactions[reaction]++;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlogs.pending, (state, _) => {
                state.status = "loading"
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "completed";
                blogAdaptor.upsertMany(state, action.payload);
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewBlog.fulfilled, blogAdaptor.addOne)
            .addCase(deleteBlogById.fulfilled, blogAdaptor.removeOne)
            .addCase(updateBlogById.fulfilled, blogAdaptor.updateOne)
    }
});

export const { 
    selectAll: selectAllBlogs, 
    selectById: selectBlogById, 
    selectIds: selectBlogIds 
} = blogAdaptor.getSelectors(state => state.blogs);

export const selectUserBlogs = createSelector(
    [selectAllBlogs, (_, userId) => userId],
    (blogs, userId) => blogs.filter(blog => blog.user === userId)
);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogsSlice.actions;

export default blogsSlice.reducer;