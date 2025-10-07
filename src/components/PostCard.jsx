import { FaPencil } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router";

export default function PostCard({title, description, image, createdAt, likeCount, id, editable=false}) {

    const navigate = useNavigate();

    return <div
        className="cursor-pointer flex gap-4 p-2 h-44 text-magenta-200 bg-neutral-700/50 relative"
        role="link"
    >
        <img className="w-1/3 object-cover" alt="" src={image}></img>
        <div className='content-center flex flex-col w-2/3 justify-between'>
            <div>
                <span className='font-bold text-xl break-words'>{title}</span>
                <div className='break-words'>{description}</div>
            </div>
            <div className='flex justify-between text-md'>
                <span><FcLike className='inline text-2xl relative bottom-1'></FcLike> {likeCount}</span>
                <span><IoCalendarOutline className='inline text-2xl relative bottom-1'></IoCalendarOutline> {createdAt}</span>
            </div>
        </div>
        <Link to={`/blogpost/${id}`}  className="absolute inset-0"/>
        {
            editable && <button
                className="p-2 hover:text-green-500 absolute top-1 right-1"
                onClick={() => navigate(`/admin/edit-post/${id}`)}

            >
                <FaPencil className='text-lg' />
            </button>
        }
    </div>
}
