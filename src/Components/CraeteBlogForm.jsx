import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blogAdded } from "src/Features/blog/blogSlice";
import { toast } from "react-toastify";
import { selectAllUsers } from "src/Features/blog/userSlice";

const CraeteBlogForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector(state => selectAllUsers(state));

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const canSaveForm = [title, content, userId].every(Boolean);

    const handleCreateBlog = () => {
        if (canSaveForm) {
            dispatch(blogAdded(title, content, +userId));
            toast.success('بلاگ جدید با موفقعیت ساخته شد');
            setTitle("");
            setContent("");
            setUserId("");
            navigate('/');
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
                    <div>
                        <label htmlFor="authores" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نویسنده ها:</label>
                        <select id="authores" value={userId} onChange={(e) => setUserId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>انتخاب نویسنده</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.fullname}</option>
                        ))}
                        </select>
                    </div>
                    <button 
                        className="bg-purple-700 rounded-xl py-3 px-8 disabled:bg-purple-400 disabled:opacity-80" 
                        onClick={handleCreateBlog}
                        disabled={!canSaveForm}>ذخیره پست</button>
                </form>
            </div>
        </div>
    )
}

export default CraeteBlogForm