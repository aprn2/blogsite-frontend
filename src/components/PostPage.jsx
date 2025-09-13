import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../utils/apiCalls";
import toast from "../utils/toast";

const renderer = new marked.Renderer();

const IndexClickHandler = (event) => {
    event.preventDefault();
    const targetHeadingId = event.target.name;
    const heading = document.querySelector(targetHeadingId);
    const yPos = heading.getBoundingClientRect().top;
    console.log(yPos);
    window.scrollTo({top: yPos - 80, behavior: 'smooth'})
}

export default function PostPage() {

    const { id } = useParams();

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    const {error, data: md, isLoading} = useQuery({
        queryKey: [id, 'postContent'],
        queryFn: () => getPostById(id)
    });

    const {html, headings} = useMemo(() => {
        if(isLoading) return {html: null, headings: null};
        const headings = [];
        renderer.heading = ({text, depth}) => {
            const headingId = 'link' + crypto.randomUUID();
            headings.push({text: text, anchor: headingId});
            return `<h${depth} id='${headingId}'>${text}</h${depth}>`
        }
        const html =  marked.parse(md.body, {renderer});
        return {html, headings};
    }, [md]);

    useEffect(() => {
        if(error) {
            toast({title: 'Error', description: 'Cant get post content', type: 'error'});
        }
    }, [error]);

    let content;

    if(isLoading) {
        content = <div>loading bro...</div>
    }else if(error) {
        content = <div>something went wrong bro...</div>
    }else {
        const quickNav = isDesktop ? <aside
            className='w-80 pl-10 text-xl pt-10'
        >
            <nav>
                <ol
                    className='flex flex-col gap-2'
                >
                    {headings.map((heading) => <li>
                        <a className="cursor-pointer hover:text-red-500"
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
            className='mt-10 text-3xl capitalize flex-grow-1'
        > 
            <div
                className='py-4 mb-2'
            >
                {md.title}
            </div>
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
