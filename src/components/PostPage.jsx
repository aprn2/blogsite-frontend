import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getImage, getPostById } from "../utils/apiCalls";
import toast from "../utils/toast";
import dayjs from "../utils/dayjsUtils";
import LikeButton  from "./LikeButton";
import { useAppContext } from "./AppContext";

const renderer = new marked.Renderer();

const IndexClickHandler = (event) => {
    event.preventDefault();
    const targetHeadingId = event.target.name;
    const heading = document.querySelector(targetHeadingId);
    const yPos = heading.getBoundingClientRect().top;
    window.scrollTo({top: yPos - 80, behavior: 'smooth'})
}

export default function PostPage() {

    const appState = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(! appState.userId) {
            navigate('/auth')
        }
    });

    const { id } = useParams();

    const [imgs, setImgs] = useState([]);
    const [imgsL, setImgsL] = useState(new Map());

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const {error, data: md, isLoading} = useQuery({
        queryKey: [id, 'postContent'],
        queryFn: () => getPostById(id)
    });

    useEffect(() => {
        for(let img of imgs) {
            if(imgsL.has(img)) {
                continue;
            }
            getImage(img)
                .then(url => setImgsL(pre => {
                    const map = new Map(pre);
                    return map.set(img, url)
                }))
                .catch(e => e)
        }
    },[imgs]);

    useEffect(() => {
        if(error) {
            toast({title: 'Error', description: 'Cant get post content', type: 'error'});
        }
    }, [error]);

    const {html, headings} = useMemo(() => {
        const headings = [];
        let html = '';
        if(md) {
            renderer.heading = ({text, depth}) => {
                const headingId = 'link' + crypto.randomUUID();
                headings.push({text: text, anchor: headingId});
                return `<h${depth} id='${headingId}'>${text}</h${depth}>`
            }
            let imagesId = [];
            renderer.image = ({href, title, text}) => {
                const source = href.split('/')
                const fileId = source[source.length - 1]; 
                imagesId.push(fileId);
                return `<img src='${imgsL.get(fileId) ?? ''}' alt='${text ?? ''}' title='${title ?? ''}'> </img>`
            }
            setImgs(imagesId);
            html =  marked.parse(md.body, {renderer});
        }
        return {html, headings};
    }, [md, imgsL]);

    let content;

    if(isLoading) {
        content = <div>loading bro...</div>
    }else if(error) {
        content = <div>something went wrong bro...</div>
    }else {

        const quickNav = isDesktop ? <aside
            className='w-100 pl-10 text-xl pt-10'
        >
            <nav>
                <ol
                    className='flex flex-col gap-2'
                >
                    {headings.map((heading) => <li key={heading.anchor}>
                        <a className="text-sm cursor-pointer hover:text-red-500"
                            href={`#${heading.anchor}`}
                            name={`#${heading.anchor}`}
                            onClick={IndexClickHandler}
                        >
                            {heading.text}
                        </a>
                    </li>)}
                </ol>
            </nav>
        </aside> : <></>

        const section = <section
            className='mt-10 capitalize flex-grow-1'
        > 
            <div
                className='font-bold py-1 text-5xl'
            >
                {md.title}
            </div>
            <div
                className='text-lg my-2'
            >
                {dayjs(md.createdAt).fromNow()}
            </div>
            <LikeButton />
            <hr />
            <div
                className='max-w-none dark:prose-invert prose-neutral prose lg:prose-xl flex-1 pt-10'
                dangerouslySetInnerHTML={{__html: html}}
            >
            </div>
        </section>

        content = <>
            {quickNav}
            {section}
        </>
    }

    return <div
        className='flex-1 flex container mx-auto'
    >
        {content}
    </div>
}
