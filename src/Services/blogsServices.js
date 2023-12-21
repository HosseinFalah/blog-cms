import apiRequest from "./Config/config"

// @desc Get All Blogs
// @route GET http://localhost:9000/blogs
export const getAllBlogs = () => {
    return apiRequest.get('/blogs');
}
// @desc Get With Blog ID
// @route GET http://localhost:9000/blogs/:blogId
export const getBlog = (blogId) => {
    return apiRequest.get(`/blogs/${blogId}`);
}

// @desc Create New Blog
// @route Post http://localhost:9000/blogs
export const createBlog = (blog) => {
    return apiRequest.post(`/blogs`, blog);
}

// @desc Update Blog
// @route put http://localhost:9000/blogs/:blogId
export const updateBlog = (blog, blogId) => {
    return apiRequest.put(`/blogs/${blogId}`, blog);
}

// @desc Delete Blog
// @route Delete http://localhost:9000/blogs/:blogId
export const deleteBlog = (blogId) => {
    return apiRequest.delete(`/blogs/${blogId}`);
}