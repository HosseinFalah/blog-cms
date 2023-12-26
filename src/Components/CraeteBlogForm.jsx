import { useState } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { selectAllUsers } from "src/Features/blog/userSlice";
import { useAddNewBlogMutation } from "src/Api/apiSlice";

const CraeteBlogForm = () => {
    const navigate = useNavigate();

    const [addNewBlog, { isLoading }] = useAddNewBlogMutation();

    const users = useSelector(state => selectAllUsers(state));

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    
    const canSaveForm = [title, content, userId].every(Boolean) && !isLoading;

    const handleCreateBlog = async () => {
        if (canSaveForm) {
            try {
                await addNewBlog({ 
                    id: nanoid(),
                    date: new Date().toISOString(),
                    title, 
                    content, 
                    user: userId,
                    reactions: {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    }
                }).unwrap();
                toast.success('بلاگ جدید با موفقعیت ساخته شد');
                setTitle("");
                setContent("");
                setUserId("");
                navigate('/');
            } catch (error) {
                toast.error('مشکلی در هنگام ساخت بلاگ به وجود امده');
                console.log(error);
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
                        className="bg-purple-600 py-3 px-6 rounded-xl mt-5 transition-all duration-300 ease-in-out hover:ring-4 ring-purple-500" 
                        onClick={handleCreateBlog}
                        disabled={!canSaveForm}>ذخیره پست</button>
                </form>
            </div>
        </div>
    )
}

export default CraeteBlogForm