import { MoonLoader } from "react-spinners";

const Spinner = ({ isFullScreen }) => {
    return (
        <div className={`flex items-center justify-center ${isFullScreen ? 'min-h-screen' : ''}`}>
            <MoonLoader color="#f251ff" size={60} />
        </div>
    )
}

export default Spinner