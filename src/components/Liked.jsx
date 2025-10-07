import { useQuery } from "@tanstack/react-query"
import PostCard from "./PostCard"
import PostCardSkeleton from "./PostCardSkeleton"
import { SearchField } from './SearchField'
import { getImage, getLikedPosts } from "../utils/apiCalls"
import { useEffect, useState } from "react"
import toast from "../utils/toast"
import dayjs from '../utils/dayjsUtils';
import { useAppContext } from "./AppContext"

export const Liked = () => {

    const appState = useAppContext();

    const {data, error, isFetching} = useQuery({
        queryKey: ['likedPosts'],
        queryFn: getLikedPosts 
    })

    const [imagesUrl, setImagesUrl] = useState(new Map());

    useEffect(() => {
        if(error) {
            toast({title: 'Cant get Resources', description: 'somthing went wrong', type: 'error'})
        }
    }, [error]);

    useEffect(() => {
        if(!data?.length) {return}

        for(let post of data) {
            getImage(post.coverImage).then(url => setImagesUrl(pre => {
                const map = new Map(pre);
                return map.set(post.coverImage, url);
            }))
            .catch(e => {});
        }
    }, [data]);

    let content;

    if(isFetching) {
        content = Array.from({length: 15}, (_, i) => <PostCardSkeleton key={i} />)
    }else if(error) {
        content = <div>can't get post</div>
    }else if(! Array.isArray(data) || data.length === 0) {
        content = <div>no post found</div> 
    }else {
        content = data.map((post, index) => 
                    <PostCard
                        key={index}
                        title={post.title}
                        description={post.description}
                        likeCount={post.likeCounts} 
                        createdAt={dayjs(post.createdAt).fromNow()}
                        id={post._id}
                        image={imagesUrl.get(post.coverImage)}
                        editable={appState.isAdmin}
                    />
        )

    }

    return (<div className="container mx-auto"> 
        <div
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {content}
        </div>
    </div>)
}
