import { useSelector } from "react-redux";
import { selectUserById } from "src/Features/blog/userSlice";

const ShowAuthor = ({userId}) => {
    const author = useSelector(state => selectUserById(state, userId));
    
    return (
        <div className="flex flex-col font-medium justify-center gap-1">
            <span className="text-sm">نویسنده:</span>
            <p className="text-sm lg:text-base">{author ? author.fullname : "نویسنده ناشناس"}</p>
        </div>
    )
}

export default ShowAuthor