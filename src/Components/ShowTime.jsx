import { parseISO, formatDistanceToNow } from "date-fns-jalali";

const ShowTime = ({timestamp}) => {
    let timeAgo = '';

    if (timestamp) {
        const date = parseISO(timestamp);
        const time = formatDistanceToNow(date);
        timeAgo = `${time} قبل`;
    }
    
    return (
        <span className="text-sm font-medium">{timeAgo}</span>
    )
}

export default ShowTime;