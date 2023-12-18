import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-zinc-700 py-5">
            <nav className="max-w-screen-xl m-auto px-4 xl:px-0">
                <div className="flex items-center justify-between">     
                    <div>
                        <Link to={`/`} className="text-xl xl:text-2xl text-blue-600 font-bold">وبلاگ ریداکسی</Link>
                    </div>
                    <div>
                        <ul className="flex items-center gap-x-4 text-white">
                            <li>
                                <button
                                    className="bg-purple-600 py-2.5 px-6 rounded-xl"
                                    onClick={() => navigate('/blogs/create-blog')}>ساخت بلاگ جدید✅</button>
                            </li>
                            <li>
                                <Link to={`/`}>احراز هویت</Link>
                            </li>
                            <li>
                                <Link to={`/`}>کاربران</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar