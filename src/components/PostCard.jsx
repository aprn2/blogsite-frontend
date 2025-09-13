import { FcLike } from "react-icons/fc";
import { IoCalendarOutline } from "react-icons/io5";
import { Link } from "react-router";

export default function PostCard({title, description, image, createdAt, likeCount, url}) {
    return <div className="flex gap-4 p-2 h-44 text-magenta-200 bg-neutral-700/50 relative">
        <img className="w-1/3 object-cover" alt="" src={image}></img>
        <div className='content-center flex flex-col flex-grow-1 justify-between'>
            <div>
                <span className='font-bold text-xl'>{title}</span>
                <p className=''>{description}</p>
            </div>
            <div className='flex justify-between text-md text-sm'>
                <span><FcLike className='inline text-2xl relative bottom-1'></FcLike> {likeCount}</span>
                <span><IoCalendarOutline className='inline text-2xl relative bottom-1'></IoCalendarOutline> {createdAt}</span>
            </div>
        </div>
        <Link className='absolute inset-0 cursor-pointer' to={url}></Link>
    </div>
}
