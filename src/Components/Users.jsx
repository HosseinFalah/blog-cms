import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "src/Features/blog/userSlice";
import Spinner from "./Spinner";

const Users = () => {
    const [loading, setLoading] = useState(true);

    const users = useSelector(state => selectAllUsers(state));

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div className="xl:max-w-screen-xl m-auto px-4 xl:px-0">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-white pt-10">کاربران</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
                    {users && users.map(user => (
                        <Link to={`/users/${user.id}`} key={user.id} className="ring-2 ring-purple-600 transition-all duration-300 ease-in-out p-4 rounded-xl hover:ring-blue-600">
                            <div className="w-full h-30 rounded-xl overflow-hidden">
                                {loading && <Spinner />} {/* Show spinner if loading */}
                                <img className={`${loading ? 'hidden' : 'block'} w-full h-full object-cover`} src={user.image} alt={user.fullname} onLoad={handleLoad}/>
                            </div>
                            <div className="mt-2 text-white">
                                <p className="text-2xl font-extrabold text-white">{user.fullname}</p>
                                <span className="text-sm font-medium text-white">{user.email}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Users