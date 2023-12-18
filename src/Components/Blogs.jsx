import { useSelector } from "react-redux";
import Card from "./Card";
import { selectAllBlogs } from "src/Features/blog/blogSlice";

const Blogs = () => {
    const blogs = useSelector(state => selectAllBlogs(state));

    // Sort Blog Date
    const orderedBlogs = blogs.slice().sort((a,b) => b.date.localeCompare(a.date));

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