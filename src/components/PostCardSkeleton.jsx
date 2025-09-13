export default function PostCardSkeleton() {
    return <div className="flex gap-4 p-3 h-44 text-magenta-200 bg-neutral-700/20 relative">
        <div className="w-1/3 h-full rounded-xl shadow bg-neutral-700 animate-pulse"></div>
        <div className='flex-grow-1 content-center flex flex-col justify-between'>
            <div className="w-4/5 h-6 rounded-sm bg-neutral-700 animate-pulse"></div>
            <div className="flex flex-col gap-2">
                <div className="w-full h-3 rounded-sm bg-neutral-700 animate-pulse"></div>
                <div className="w-full h-3 rounded-sm bg-neutral-700 animate-pulse"></div>
                <div className="w-2/3 h-3 rounded-sm bg-neutral-700 animate-pulse"></div>
            </div>
            <div>
            </div>
            <div className='flex gap-2 justify-between text-md text-sm'>
                <div className="w-2/5 h-4 rounded-sm bg-neutral-700 animate-pulse"></div>
                <div className="w-2/5 h-4 rounded-sm bg-neutral-700 animate-pulse"></div>
            </div>
        </div>
    </div>
}
