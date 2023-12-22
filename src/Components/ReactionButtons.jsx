import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { reactionAdded } from "src/Features/blog/blogSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    hooray: "🎉",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
}

const ReactionButtons = ({ blogId, reactions }) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button 
            key={name}
            onClick={() => {
                dispatch(reactionAdded({ blogId , reaction: name}));
                toast.success("ممنون از نظر شما");
            }}
            className="bg-purple-500 p-1 rounded-lg transition-all duration-300 ease-in-out hover:ring-4 ring-purple-700">
            {emoji} {reactions[name]}
        </button>
    ));

    return <div className="flex items-center gap-x-2 mb-5">{reactionButtons}</div>
}

export default ReactionButtons;