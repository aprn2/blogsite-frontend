import avatar from '../assets/woman.png'
import PostCard from './PostCard'

export default function UserPage() {
    return <main className='sm:w-3/4 px-3 bg-stone-100'>
        <div className="flex pt-5 gap-8">
            <img src={avatar} alt="" className="h-20">
            </img>
            <div className="content-center">
                <span className='font-bold text-xl'>userName</span>
                <br></br>
                <span>name</span>
            </div>
        </div>
        <div className='mt-10 flex flex-col gap-2'>
            <hr className='text-stone-400'></hr>
            <span className='font-bold text-2xl'>Posts</span>
            <hr className='text-stone-400'></hr>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <PostCard
                    title={'hi'}
                    description={'djkfjkjsakfdjksjfksdkjfk dfkjksf sdkfj sdfkj dfj kjkjjj'}
                    image={'kkk'}
                    likeCount={90}
                    createdAt={'May 14 2023'}
                    url={''}
                ></PostCard>
                <PostCard
                    title={'hi'}
                    description={'djkfjkjsakfdjksjfksdkjfk dfkjksf sdkfj sdfkj dfj kjkjjj'}
                    image={'kkk'}
                    likeCount={90}
                    createdAt={'May 14 2023'}
                ></PostCard>
                <PostCard
                    title={'hi'}
                    description={'djkfjkjsakfdjksjfksdkjfk dfkjksf sdkfj sdfkj dfj kjkjjj'}
                    image={'kkk'}
                    likeCount={90}
                    createdAt={'May 14 2023'}
                ></PostCard>
            </div>
        </div>
    </main>
}