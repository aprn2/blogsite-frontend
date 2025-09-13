import { useQuery } from "@tanstack/react-query"
import PostCard from "./PostCard"
import PostCardSkeleton from "./PostCardSkeleton"
import { SearchField } from './SearchField'
import { getImage, getRecentPosts, searchPost } from "../utils/apiCalls"
import { useEffect, useState } from "react"
import toast from "../utils/toast"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const Home = () => {

    // show recent post or search
    const [searchTerm, setSearchTerm] = useState('');

    const {data, error, isFetching, refetch} = useQuery({
        queryKey: ['post'],
        queryFn: ! searchTerm ? getRecentPosts : () => searchPost(searchTerm), 
        staleTime: 10000
    })

    useEffect(() => {
        if(error) {
            toast({title: 'Cant get Resources', description: 'somthing went wrong', type: 'error'})
        }
    }, [error]);

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
                        url={`/blogpost/${post._id}`}
                    />
        )

    }

    return (<div className="container mx-auto"> 
        <SearchField value={searchTerm} onChange={setSearchTerm} onSearch={refetch} />
        <div
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {content}
        </div>
    </div>)
}
