/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import ShowTime from "./ShowTime"
import ShowAuthor from "./ShowAuthor"

const Card = ({id, title, content, date, user}) => {
    return (
        <div className="w-full h-full pb-5 pt-14 lg:pb-7">
            <div className="relative flex flex-col h-full rounded-xl bg-gradient-to-tr from-amber-600 to-rose-400">
                <Link
                    to={`/blogs/${id}`}
                    className="flex w-full h-full flex-col px-4 lg:px-5"
                >
                    <div className="relative -mt-14 flex w-full">
                        <img
                            src="/image/next-course.png"
                            className="block w-full object-cover rounded-xl"
                            alt="بنر"
                        />
                    </div>
                    <h3 className="mt-5 w-full text-base lg:text-xl font-bold text-white">{title}</h3>
                    <h3 className="mt-5 w-full text-sm font-bold text-white">{content.slice(0, 60)}...</h3>
                    <div className="my-5 flex items-center text-white gap-2">
                        <img
                            src="/image/profile.jpg"
                            className="block w-10 h-10 object-cover rounded-full"
                            alt="پروفایل مدرس"
                        />
                        <ShowAuthor userId={user}/>
                    </div>
                    <div className="mb-5">
                        <ShowTime timestamp={date}/>
                    </div>
                    <div className="grid mb-5">
                        <button className="flex items-center justify-center gap-x-2.5 bg-blue-800 transition-all duration-300 ease-in-out py-3 px-8 rounded-xl drop-shadow-2xl text-white focus:ring-2 ring-blue-800">
                            مشاهده
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Card