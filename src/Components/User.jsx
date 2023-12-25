import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { selectUserById } from "src/Features/blog/userSlice";
import Card from "./Card";
import { selectAllBlogs } from "src/Features/blog/blogSlice";

const User = () => {
    const { userId } = useParams();

    const user = useSelector(state => selectUserById(state, userId));
    const blogs = useSelector(state => selectAllBlogs(state));
    
    const relatedBlogs = blogs.find(blog => blog.user === userId);
    
    return (
        <div className="xl:max-w-screen-xl m-auto px-4 xl:px-0">
            <div className="flex flex-col gap-4 mt-10">
                <div className="bg-zinc-700 rounded-2xl pb-8">
                    <div className="w-full h-96">
                        <img src={user?.image} className="w-full h-full object-cover" alt={user?.fullname} />
                    </div>
                    <div className="p-4">
                        <h1 className="text-2xl xl:text-4xl font-extrabold text-white mb-5">{user?.fullname}</h1>
                        <span className="text-lg font-medium text-zinc-300">{user?.email}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-5">
                    <h2 className="text-4xl font-extrabold text-white">پست های ساخته شده توسط {user?.fullname}</h2>
                    {!relatedBlogs && <p className="text-center font-medium text-3xl text-zinc-500">هنوز هیچ پستی توسط {user?.fullname} ساخته نشده</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-white">
                        {relatedBlogs && <Card {...relatedBlogs}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User