import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, selectAllBlogs } from "src/Features/blog/blogSlice";
import Card from "./Card";
import Spinner from "./Spinner";

const Blogs = () => {
    const dispatch = useDispatch();

    const blogs = useSelector(state => selectAllBlogs(state));
    const blogStatus = useSelector(state => state.blogs.status);

    useEffect(() => {
        if (blogStatus === "idle") {
            dispatch(fetchBlogs());
        }
    }, [blogStatus, dispatch]);

    // Sort Blog Date
    const orderedBlogs = blogs.slice().sort((a,b) => b.date.localeCompare(a.date));

    if (blogStatus === "loading") {
        return <Spinner/>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 px-4 xl:px-0">
            {blogs && orderedBlogs.map(blog => (
                <Card key={blog.id} {...blog}/>
            ))}
            {!blogs.length && <h1 className="text-2xl font-semibold text-center">هیچ بلاگی ساخته نشده😊</h1>}
        </div>
    )
}

export default Blogs