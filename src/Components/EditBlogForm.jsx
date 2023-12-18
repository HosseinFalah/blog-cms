import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { blogUpdated, selectBlogById } from "src/Features/blog/blogSlice";


const EditBlogForm = () => {
    const { blogId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const blog = useSelector(state => selectBlogById(state, blogId));

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const handleEditBlog = (e) => {
        e.preventDefault();
        if (title && content) {
            dispatch(blogUpdated({ id: blogId, title, content }));
            navigate(`/blogs/${blogId}`);
        }
    }

    return (
        <div className="text-white pt-10">
            <div className="max-w-screen-xl m-auto px-4 xl:px-0">
                <h1 className="text-3xl font-semibold">ساخت پست جدید</h1>
                <form className="space-y-6 mt-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="create-post">عنوان پست:</label>
                        <input 
                            type="text" 
                            className="bg-neutral-500 p-3 rounded-xl focus:ring-2 ring-purple-600 focus:outline-none" 
                            id="create-post"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="create-content">محتوای اصلی:</label>
                        <textarea 
                            className="bg-neutral-500 p-3 rounded-xl focus:ring-2 ring-purple-600 focus:outline-none" 
                            id="create-content"
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <button 
                        className="bg-purple-700 rounded-xl py-3 px-8" 
                        onClick={handleEditBlog}>ویرایش پست</button>
                </form>
            </div>
        </div>
    )
}

export default EditBlogForm