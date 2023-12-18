import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogAdded } from "src/Features/blog/blogSlice";
import { toast } from "react-toastify";

const CraeteBlogForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleCreateBlog = () => {
        if (title && content) {
            dispatch(blogAdded(title, content));
            toast.success('بلاگ جدید با موفقعیت ساخته شد');
            navigate('/');
            setTitle("");
            setContent("");
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
                        onClick={handleCreateBlog}>ذخیره پست</button>
                </form>
            </div>
        </div>
    )
}

export default CraeteBlogForm