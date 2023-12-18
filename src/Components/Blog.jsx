import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogNotFound from "./BlogNotFound";
const Blog = () => {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const blogs = useSelector(state => state.blogs);

    const blog = blogs.find(blog => blog.id === blogId);

    if (!blog) {
        return <BlogNotFound/>
    }

    return (
        <div className="bg-zinc-600 text-white">
            <div className="max-w-screen-xl m-auto px-4 xl:px-0">
                <div className="pt-10">
                    <h1 className="text-2xl font-extrabold">{blog.title}</h1>
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
                        className="bg-purple-600 py-3 px-6 rounded-xl mt-5 transition-all duration-300 ease-in-out hover:ring-4 ring-purple-500"
                        onClick={() => navigate(`/`)}>
                        بازگشت به صفحه اصلی</button>
                </div>
            </div>
        </div>
    )
}

export default Blog