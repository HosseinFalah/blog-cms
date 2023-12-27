import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BlogNotFound from "./BlogNotFound";
import { deleteBlogById, selectBlogById } from "src/Features/blog/blogSlice";
import toast from "react-hot-toast";
import ShowAuthor from "./ShowAuthor";
import { useGetBlogQuery } from "src/Api/apiSlice";
import Spinner from "./Spinner";
const Blog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogId } = useParams();
    
    const {
        data: blog,
        isLoading,
        isSuccess,
        isError
    } = useGetBlogQuery(blogId);

    const handleDelete = () => {
        if (blog) {
            try {                
                dispatch(deleteBlogById(blog.id));
                toast.success('بلاگ با موفقعیت حذف شد');
                navigate('/');
            } catch (error) {
                console.log(error);
                toast.error('مشکلی در حذف بلاگ پیش امده');
            }
        }
    }
    
    return (
        <div className="bg-zinc-600 text-white">
            {isLoading && <Spinner isFullScreen={true}/>}
            {isError && <BlogNotFound/>}
            {isSuccess && (
                <div className="max-w-screen-xl m-auto px-4 xl:px-0">
                    <div className="pt-10">
                        <h1 className="text-2xl font-extrabold">{blog.title}</h1>
                    </div>
                    <div className="my-5 flex items-center text-white gap-2">
                        <ShowAuthor userId={blog.user}/>
                    </div>
                    <div className="mt-10">
                        <p className="text-xl font-medium text-amber-300">{blog.content}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            className="bg-purple-600 py-3 px-6 rounded-xl mt-5 transition-all duration-300 ease-in-out hover:ring-4 ring-purple-500"
                            onClick={() => navigate(`/edit-blog/${blog.id}`)}>
                            ویرایش پست</button>
                        <button 
                            className="bg-red-600 py-3 px-6 rounded-xl mt-5 transition-all duration-300 ease-in-out hover:ring-4 ring-red-500"
                            onClick={handleDelete}>
                            حذف پست</button>
                        <button 
                            className="bg-purple-600 py-3 px-6 rounded-xl mt-5 transition-all duration-300 ease-in-out hover:ring-4 ring-purple-500"
                            onClick={() => navigate(`/`)}>
                            بازگشت به صفحه اصلی</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Blog