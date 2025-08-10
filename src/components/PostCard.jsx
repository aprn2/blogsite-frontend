import { FcLike } from "react-icons/fc";
import { IoCalendarOutline } from "react-icons/io5";

export default function PostCard({title, description, image, createdAt, likeCount, url}) {
    return <div className="flex gap-2 p-2 h-34 bg-stone-200 relative">
        <img className="w-1/3 object-cover" alt="" src={image}></img>
        <div className='content-center flex flex-col justify-between'>
            <div>
                <span className='font-bold text-xl'>{title}</span>
                <p className=''>{description}</p>
            </div>
            <div className='flex justify-between text-md text-sm text-gray-600'>
                <span><FcLike className='inline text-2xl relative bottom-1'></FcLike> {likeCount}</span>
                <span><IoCalendarOutline className='inline text-2xl relative bottom-1'></IoCalendarOutline> {createdAt}</span>
            </div>
        </div>
        <a className='absolute inset-0 cursor-pointer' href={url}></a>
    </div>
}
