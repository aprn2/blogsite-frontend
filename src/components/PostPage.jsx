import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import { useMediaQuery } from "react-responsive";

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

    const [md, setmd] = useState('');
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    useEffect(() => {
        fetch('/public/post1.md')
            .then(res => res.text())
            .then(content => setmd(content))
            .catch(() => alert('aiyaooo'))
    }, []);

    const {html, headings} = useMemo(() => {
        const headings = [];
        renderer.heading = ({text, depth}) => {
            const headingId = 'link' + crypto.randomUUID();
            headings.push({text: text, anchor: headingId});
            return `<h${depth} id='${headingId}'>${text}</h${depth}>`
        }
        const html =  marked.parse(md, {renderer});
        return {html, headings};
    }, [md]);

    return <div
        className='flex-1 flex container mx-auto'
    >
        {isDesktop && <aside
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
        </aside>}
        <section
            className='p-3 max-w-none dark:prose-invert prose-neutral prose lg:prose-xl flex-1 pt-10'
            dangerouslySetInnerHTML={{__html: html}}
        >
        </section>
    </div>
}
