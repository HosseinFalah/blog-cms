import { useSelector } from "react-redux";

const ShowAuthor = ({userId}) => {
    const author = useSelector(state => state.users.find(user => user.id === userId));

    return (
        <div className="flex flex-col font-medium justify-center gap-1">
            <span className="text-sm">نویسنده:</span>
            <p className="text-sm lg:text-base">{author ? author.fullname : "نویسنده ناشناس"}</p>
        </div>
    )
}

export default ShowAuthor