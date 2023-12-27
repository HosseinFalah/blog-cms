import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "src/Features/blog/userSlice";
import Spinner from "./Spinner";

const Users = () => {
    // const dispatch = useDispatch();

    const [fullname, setFullname] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    const users = useSelector(state => selectAllUsers(state));

    const canSave = [fullname, image, email].every(Boolean);

    const handleLoad = () => {
        setLoading(false);
    };

    // const handleCreateUser = () => {
    //     if (canSave) {
    //         dispatch(addNewUser({ id: nanoid(), fullname, image, email}));
    //         toast.success('کاربر جدید با موفقیت ساخته شد');
    //         setFullname("");
    //         setImage("");
    //         setEmail("");
    //     }
    // }

    // const handleRemoveUser = (userId) => {
    //     console.log(userId);
    //     dispatch(deleteUserById(userId));
    //     toast.success("کاربر با موفقعیت حذف شد");
    // }

    return (
        <div className="xl:max-w-screen-xl m-auto px-4 xl:px-0">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-white pt-10">ساخت کاربر جدید</h1>
                <form className="flex flex-col gap-y-4" autoComplete="off">
                    <div className="text-white">
                        <label htmlFor="username" className="text-lg font-medium">نام کاربری:</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="p-2 mt-4 rounded-lg bg-zinc-500 w-full outline-none border-none" 
                            placeholder="نام کاربری را وارد کنید"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="text-white">
                        <label htmlFor="image" className="text-lg font-medium">لینک عکس:</label>
                        <input 
                            type="text" 
                            id="image" 
                            className="p-2 mt-4 rounded-lg bg-zinc-500 w-full outline-none border-none" 
                            placeholder="لینک عکس را وارد کنید"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                    </div>
                    <div className="text-white">
                        <label htmlFor="email" className="text-lg font-medium">آدرس ایمیل:</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="p-2 mt-4 rounded-lg bg-zinc-500 w-full outline-none border-none" 
                            placeholder="آدرس ایمیل را وارد کنید"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button 
                        className="bg-purple-600 mt-4 py-2.5 px-6 rounded-xl text-white font-bold transition-all duration-300 ease-in-out disabled:bg-purple-500 disabled:opacity-60"
                        // onClick={handleCreateUser}
                        disabled={!canSave}>
                            ساخت کاربر جدید
                    </button>
                </form>
                <h2 className="text-2xl xl:text-4xl font-extrabold text-white pt-10">کاربران</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
                    {users && users.map(user => (
                        <div key={user.id} className="ring-2 ring-purple-600 transition-all duration-300 ease-in-out p-4 rounded-xl hover:ring-blue-600">
                            <Link to={`/users/${user.id}`}>
                                <div className="w-full h-30 rounded-xl overflow-hidden">
                                    {loading && <div className="p-4">
                                            <Spinner isFullScreen={false} /> {/* Show spinner if loading */}
                                        </div>
                                    }
                                    <img className={`${loading ? 'hidden' : 'block'} w-full h-full object-cover`} src={user.image} alt={user.fullname} onLoad={handleLoad}/>
                                </div>
                            </Link>
                            <div className="mt-2 text-white">
                                <p className="text-2xl font-extrabold text-white">{user.fullname}</p>
                                <span className="text-sm font-medium text-white">{user.email}</span>
                            </div>
                            <div className="grid">
                                <button 
                                    className="bg-red-500 text-white font-semibold mt-4 rounded-lg py-2.5"
                                    // onClick={() => handleRemoveUser(user.id)}
                                    >
                                        حذف کاربر
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Users