import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectBlogById, updateBlogById } from "src/Features/blog/blogSlice";


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
            try {
                dispatch(updateBlogById({ 
                    id: blogId, 
                    date: blog.date,
                    title, 
                    content, 
                    user: blog.user,
                    reactions: {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    }
                }));
                toast.success('بلاگ با موفقعیت ویرایش شد');
                navigate(`/`);
            } catch (error) {
                toast.error('مشکلی در ویرایش بلاگ به وجود امده است');
            }
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
                        className="bg-purple-600 py-3 px-6 rounded-xl mt-5 transition-all duration-300 ease-in-out hover:ring-4 ring-purple-500" 
                        onClick={handleEditBlog}>ویرایش پست</button>
                </form>
            </div>
        </div>
    )
}

export default EditBlogForm