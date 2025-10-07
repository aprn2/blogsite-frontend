import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { isLiked, likePost, removeLikePost } from "../utils/apiCalls";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";

export default function LikeButton() {

    const { id } = useParams();

    const queryClient = useQueryClient();

    const {error, data: liked, isLoading} = useQuery({
        queryKey: [id, 'postLiked'],
        queryFn: () => isLiked(id)
    });

    const {mutate} = useMutation({
        mutationFn:() => ! liked ? likePost(id) : removeLikePost(id), 
        onSuccess: () => {
            queryClient.setQueryData([id, 'postLiked'], ! liked);
        }

    });

    let content;
    if(error) {
        content = <div>error</div>
    }else if(isLoading) {
        content = <div>loading</div>
    }else if(liked === false) {
        content = <><span>Like</span><MdOutlineThumbUp size={20}/></> 
    }else if(liked === true) {
        content = <><span>Unlike</span><MdOutlineThumbDown size={20}/></> 
    }

  return (
        <button
            type="button"
            className={`${liked ? 'bg-red-600 border-white' : 'border-red-600 text-red-600'} w-26 rounded-sm flex items-center justify-between gap-2 border-1 px-3 py-1 mb-2`}
            onClick={mutate}
        >
            {content}
        </button>
  )
}
