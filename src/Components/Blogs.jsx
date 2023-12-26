import { useMemo } from "react";
import { useGetBlogsQuery } from "src/Api/apiSlice";
import Card from "./Card";
import Spinner from "./Spinner";

const Blogs = () => {
    const {
        data: blogs = [],
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBlogsQuery();

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice();
        return sortedBlogs.sort((a, b) => b.date.localeCompare(a.date));
    }, [blogs])

    if (isLoading) {
        return <Spinner isFullScreen={true}/>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 px-4 xl:px-0">
            {isSuccess && sortedBlogs.map(blog => (
                <Card key={blog.id} {...blog}/>
            ))}
            {!blogs.length && <h1 className="text-2xl font-semibold text-center">هیچ بلاگی ساخته نشده😊</h1>}
            {isError && <h4 className="text-2xl text-red-400 font-semibold text-center">خطا مشکلی پیش آمده😊{error}</h4>}
        </div>
    )
}

export default Blogs